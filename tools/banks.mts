import { readFile, stat } from 'node:fs/promises';

const RE_NL = /\r?\n/;
const COMMENT_MARKER = '//';

const isFileExists = async (filePath: string): Promise<boolean> => {
    return stat(filePath)
        .then((stats) => stats.isFile())
        .catch(() => false);
};

const readRules = async (filePath: string): Promise<string[]> => {
    const fileContent = await readFile(filePath, { encoding: 'utf-8' });

    return fileContent
        .split(RE_NL)
        .map((line) => line.trim())
        .filter((line) => line.length > 0 && !line.startsWith(COMMENT_MARKER));
};

const isSortedAlphabetically = (arr: string[]): boolean => {
    for (let i = 0; i < arr.length - 1; i += 1) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
};

const getErrorMessage = (err: unknown): string => {
    if (err instanceof Error) {
        return err.message;
    }

    return 'Unknown error';
};

const isNonEmptyString = (value: unknown): value is string => {
    return typeof value === 'string' && value.length > 0;
};

const main = async () => {
    const filePath = process.argv[2];

    try {
        if (!isNonEmptyString(filePath)) {
            throw new Error('File path is not provided');
        }

        if (!(await isFileExists(filePath))) {
            throw new Error(`File ${filePath} does not exist`);
        }

        const rules = await readRules(filePath);

        if (!isSortedAlphabetically(rules)) {
            throw new Error(`Rules in ${filePath} is not sorted alphabetically`);
        }
    } catch (err) {
        console.error(getErrorMessage(err));
        process.exit(1);
    }
};

main();