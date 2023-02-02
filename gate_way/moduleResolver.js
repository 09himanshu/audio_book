// This file help us to prevent the erorr of module not found

import fs from 'fs';
import path from 'path';

export function resolve(specifier, parentModuleURL, defaultResolver) {
    try {
        specifier = specifier.replace(/^#/, "file:///" + path.resolve(".") + "/src/");
        specifier =
            fs.existsSync(specifier) && fs.lstatSync(specifier).isDirectory() ? `${specifier}/index` : specifier;
        return defaultResolver(specifier, parentModuleURL);
    } catch (err) {
        throw err;
    }
}