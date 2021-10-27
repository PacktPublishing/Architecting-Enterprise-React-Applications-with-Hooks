import { Seq } from "immutable";
import simpleGit from "simple-git";

const git = simpleGit();

const options = {
  interactive:
    process.argv.includes("--interactive") || process.argv.includes("-i"),
};

(async function () {
  const branchSummary = await git.branch(["--list"]);
  const checkpointBranches = Seq(branchSummary.all)
    .filter((branch) => branch.startsWith("Checkpoint_"))
    .map((branchName) => {
      const { chapter, decimal } = branchName.match(
        /Checkpoint_(?<chapter>\d+)\.(?<decimal>\d+)/
      ).groups;
      return {
        name: branchName,
        chapter: parseInt(chapter),
        decimal: parseInt(decimal),
      };
    })
    .sort(
      (
        { chapter: chapterA, decimal: decimalA },
        { chapter: chapterB, decimal: decimalB }
      ) => {
        if (chapterA === chapterB) return decimalA - decimalB;
        else return chapterA - chapterB;
      }
    )
    .map(({ name }) => name);
  const branches = checkpointBranches.concat("main").toJS();

  const startingBranchIndex = branches.indexOf(branchSummary.current);
  let previousBranch = branches[startingBranchIndex];
  try {
    for (let i = startingBranchIndex + 1; i < branches.length; i++) {
      const currentBranch = branches[i];

      await git.checkout(currentBranch).rebase({
        ...(options.interactive ? { "--interactive": null } : {}),
        [previousBranch]: null,
      });

      previousBranch = currentBranch;
    }

    git.push(["--all", "--set-upstream", "origin", "--force-with-lease"]);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
    await git.rebase(["--abort"]).checkout(previousBranch);
  }
})();
