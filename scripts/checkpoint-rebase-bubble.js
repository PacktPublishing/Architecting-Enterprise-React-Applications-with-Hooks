const util = require("util");
const exec = util.promisify(require("child_process").exec);

const options = {
  interactive:
    process.argv.includes("--interactive") || process.argv.includes("-i"),
};

(async function () {
  try {
    const branchList = (await exec("git branch --list")).stdout;
    const checkpointBranches = [
      ...branchList.matchAll(/Checkpoint_(?<chapter>\d+)\.(?<decimal>\d+)/g),
    ].map(([name, chapter, decimal]) => ({
      name,
      chapter: parseInt(chapter),
      decimal: parseInt(decimal),
    }));
    checkpointBranches.sort(
      (
        { chapter: chapterA, decimal: decimalA },
        { chapter: chapterB, decimal: decimalB }
      ) => {
        if (chapterA === chapterB) return decimalA - decimalB;
        else return chapterA - chapterB;
      }
    );
    const branches = [...checkpointBranches.map(({ name }) => name), "main"];

    const startingBranch = (
      await exec("git branch --show-current")
    ).stdout.trimEnd();

    let startingBranchReached = false;
    let previousBranch = "";
    for (const branch of branches) {
      if (startingBranchReached === false) {
        if (branch === startingBranch) {
          startingBranchReached = true;
          previousBranch = branch;
        }

        continue;
      }

      await exec(`
        git checkout ${branch};
        git rebase ${
          options.interactive ? "--interactive " : ""
        }--strategy-option ours ${previousBranch};
      `);
      previousBranch = branch;
    }

    exec("git push --all --set-upstream origin --force-with-lease");
  } catch (error) {
    await exec("git rebase --abort");
    console.error(error.stderr);
    process.exitCode = 1;
  }
})();
