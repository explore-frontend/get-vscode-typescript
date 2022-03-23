import * as path from 'path';
import * as fs from 'fs';

export enum LibType {
    TypeScript = 'typescript.js',
    TypeScriptServer = 'tsserver.js',
    TypeScriptServerLibrary = 'tsserverlibrary.js',
}

function getVSCodeTypeScriptLibPath(appRoot: string) {
    return path.join(
        appRoot,
        'extensions',
        'node_modules',
        'typescript',
        'lib'
    );
}

function getTypeScriptInstanceInLib(basePath: string, libType: LibType | undefined) {
    const libs = [LibType.TypeScript, LibType.TypeScriptServer, LibType.TypeScriptServerLibrary];

    for (const lib of libs) {
        if (libType && lib !== libType) {
            continue
        }

        const libPath = path.join(basePath, lib);
        if (!fs.existsSync(libPath)) {
            continue
        }

        try {
            return require(libPath) as unknown;
        } catch {
            // ignore
        }
    }

    return undefined
}

export function getVSCodeTypeScriptInstance(appRoot: string, libType?: LibType) {
    return getTypeScriptInstanceInLib(getVSCodeTypeScriptLibPath(appRoot), libType);
}

const defaultTsdk = 'node_modules/typescript/lib';
export function getWorkspaceTypeScriptInstance(workspaces: string[], tsdk: string = defaultTsdk, libType?: LibType) {
    if (path.isAbsolute(tsdk)) {
        const instance = getTypeScriptInstanceInLib(tsdk, libType);
        if (instance) {
            return instance;
        }
    }
    else {
        for (const folder of workspaces) {
            const instance = getTypeScriptInstanceInLib(path.join(folder, tsdk), libType);
            if (instance) {
                return instance;
            }
        }
    }
    return undefined;
}
