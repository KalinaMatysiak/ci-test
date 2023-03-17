const util = require("util");
const { exec } = require("child_process");

const execProm = util.promisify(exec);

async function runCommand(command) {
  let result;

  try {
    result = await execProm(command);
  } catch (err) {
    return "error";
  }

  return result.stdout;
}

const assertsDockerImageRef = async (expectedSha, dockerImageSha) => {
  console.log(`Comparing ${expectedSha} to ${dockerImageSha}`);
  const currentSha = await runCommand("git rev-parse HEAD");
  if (expectedSha === "current") {
    if (currentSha.trim() !== dockerImageSha) {
      throw new Error(
        `Wrong SHA - expected values ${dockerImageSha} but got ${currentSha}`
      );
    }
    return true;
  }

  if (expectedSha !== dockerImageSha) {
    throw new Error(
      `Wrong SHA - expected values ${expectedSha} but got ${currentSha}`
    );
  }
  return true;
};

assertsDockerImageRef(process.env.EXPECTED_SHA, process.env.DOCKER_IMAGE_SHA);
