import simpleGit from "simple-git";
import { getCheckpointBranches } from "./lib.mjs";

const git = simpleGit();

(async function () {
  try {
    const { branches, currentBranch } = await getCheckpointBranches(git);
    const branchesToRename = branches
      .filter(
        (branch) =>
          branch.chapter === currentBranch.chapter &&
          branch.decimal >= currentBranch.decimal
      )
      .reverse();

    const deleteRemoteBranchTasks = branchesToRename.map((branch) =>
      git.push("origin", branch.name, ["--delete"])
    );

    for (const branch of branchesToRename) {
      const isCurrentBranch = branch.name === currentBranch.name;
      const newName = `Checkpoint_${branch.chapter}.${branch.decimal + 1}`;
      await git.branch([
        "--move",
        ...(isCurrentBranch ? [] : [branch.name]),
        newName,
      ]);
    }
    await git.checkoutLocalBranch(currentBranch.name);

    await Promise.all(deleteRemoteBranchTasks);

    git.push(["--all", "--set-upstream", "origin", "--force-with-lease"]);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
})();
