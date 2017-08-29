'use strict';
import * as vscode from 'vscode';
import * as path from 'path';
import { exec, ChildProcess } from 'child_process';
var child: ChildProcess;
function spawnChild() {
    let c = exec(`tsc -w -p ${vscode.workspace.rootPath}`);
    c.stdout.on('data', data => { });
    c.stderr.on('data', data => console.error(data));
    c.on('exit', (e) => {
        child = spawnChild();
    });
    return c;
}
export function activate(context: vscode.ExtensionContext) {
    child = spawnChild();
}

// this method is called when your extension is deactivated
export function deactivate() {
    if (child) {
        child.kill("SIGINT");
    }
}