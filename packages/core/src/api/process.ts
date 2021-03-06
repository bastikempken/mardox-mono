import { CONVERTER, DEFAULT_OPTIONS, print } from '../internal';
import { Options } from './model';

const setDefaultOptionsIfNeeded = (options: Options): Options => {
    let workingOptions: Options = Object.assign(DEFAULT_OPTIONS, options);
    if (!workingOptions.outputFile) {
        workingOptions = {
            ...workingOptions,
            outputFile: {
                ...workingOptions.inputFile,
                fileEnding: 'pdf',
            },
        };
    }
    return workingOptions;
};

export function process(inputOptions: Options): void {
    const options = setDefaultOptionsIfNeeded(inputOptions);
    const converter = CONVERTER.find(
        (converterItem) =>
            options.inputFile.fileEnding === converterItem.fileEnding
    );
    if (!converter) {
        throw Error('Unknown file format!!');
    }
    const dom = converter.convert(options);
    print(options, dom);
}
