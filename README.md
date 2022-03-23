# get-vscode-typescript

Get TypeScript Lib instance in VSCode extension environment.  
Rather than package the TypeScript and add 8mb more size.

## Usage

```ts
import type * as ts from 'typescript';
import * as vscode from 'vscode';
import { getVSCodeTypeScriptInstance } from 'get-vscode-typescript';

export function activate(context: vscode.ExtensionContext) {
    const typescript = getVSCodeTypeScriptInstance(vscode.env.appRoot) as typeof ts;
    // do something with ts
}
```

## Note
Copied from [Volar](https://github.com/johnsoncodehk/volar/blob/master/packages/shared/src/ts_node.ts) and re-published as an OSS package.

Thanks all works from [Johnson Chu](https://github.com/johnsoncodehk).
