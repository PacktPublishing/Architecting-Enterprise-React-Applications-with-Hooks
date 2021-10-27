import simpleGit from "simple-git";
import { getCheckpointBranches } from "./lib.mjs";

const git = simpleGit();

const options = {
  interactive:
    process.argv.includes("--interactive") || process.argv.includes("-i"),
};

(async function () {
  let previousBranch;
  try {
    const { branches, currentBranch: startingBranch } =
      await getCheckpointBranches(git);
    const branchNames = branches.map((branch) => branch.name);

    const startingBranchIndex = branchNames.indexOf(startingBranch.name);
    previousBranch = branchNames[startingBranchIndex];
    for (let i = startingBranchIndex + 1; i < branchNames.length; i++) {
      const currentBranch = branchNames[i];

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
