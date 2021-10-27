import { Seq } from "immutable";

export async function getCheckpointBranches(git) {
  const branchSummary = await git.branch(["--list"]);

  let currentBranch;
  const branches = Seq(branchSummary.all)
    .filter((branch) => branch.startsWith("Checkpoint_"))
    .map((branchName) => {
      const { chapter, decimal } = branchName.match(
        /Checkpoint_(?<chapter>\d+)\.(?<decimal>\d+)/
      ).groups;
      const branch = {
        name: branchName,
        chapter: parseInt(chapter),
        decimal: parseInt(decimal),
      };
      if (branchName === branchSummary.current) {
        currentBranch = branch;
      }
      return branch;
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
    .concat({ name: "main" })
    .toJS();

  return { branches, currentBranch };
}
