import * as vscode from "vscode";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

type VSCommand = {
  title: string;
  command: string;
};

export enum KCommand {
  APPLY = "apply",
  DELETE = "delete",
  DESCRIBE = "describe",
  GET = "get",
}

export const commandMap: Record<KCommand, VSCommand> = {
  [KCommand.APPLY]: {
    title: "Apply",
    command: "kube-flow.applyResource",
  },
  [KCommand.DESCRIBE]: {
    title: "Describe",
    command: "kube-flow.describeResource",
  },
  [KCommand.GET]: { title: "Get", command: "kube-flow.getResource" },
  [KCommand.DELETE]: {
    title: "Delete",
    command: "kube-flow.deleteResource",
  },
};

let kubectlTerminal: vscode.Terminal | undefined;

export async function runKubectlCommandOnResource(
  command: string,
  yaml: string
) {
  try {
    const tempFilePath = path.join(os.tmpdir(), "temp-kubectl-resource.yaml");
    fs.writeFileSync(tempFilePath, yaml);

    if (!kubectlTerminal) {
      kubectlTerminal = vscode.window.createTerminal("kubectl");
    }

    kubectlTerminal.show();
    kubectlTerminal.sendText("clear");
    kubectlTerminal.sendText(`kubectl ${command} -f ${tempFilePath}`);

    // Wait for the command to complete and then delete the temporary file
    kubectlTerminal.processId.then((pid) => {
      if (pid) {
        const interval = setInterval(() => {
          try {
            process.kill(pid, 0);
          } catch (e) {
            clearInterval(interval);
            fs.unlinkSync(tempFilePath);
          }
        }, 1000);
      }
    });
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to apply resource: ${error}`);
  }
}
