(function (Scratch) {
    'use strict';
    const EXTENSION_ID = 'memoryData';

    class MemoryData {
        constructor() {
            this.dataStore = {}; // Armazenará os dados como um objeto
        }

        getInfo() {
            return {
                id: EXTENSION_ID,
                name: 'Memory Data',
                blocks: [
                    {
                        opcode: 'setData',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'in the [path] set to [value]',
                        arguments: {
                            path: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'defaultPath'
                            },
                            value: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'defaultValue'
                            }
                        }
                    },
                    {
                        opcode: 'getData',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get from [path]',
                        arguments: {
                            path: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'defaultPath'
                            }
                        }
                    },
                    {
                        opcode: 'createFile',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'in the project file create [fileName] value [fileValue]',
                        arguments: {
                            fileName: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'defaultFile.txt'
                            },
                            fileValue: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'default text'
                            }
                        }
                    },
                    {
                        opcode: 'readFile',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'read file [filePath]',
                        arguments: {
                            filePath: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'defaultFile.txt'
                            }
                        }
                    },
                    {
                        opcode: 'setEditorKey',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'in the editor keys set [key] to [value]',
                        arguments: {
                            key: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'defaultKey'
                            },
                            value: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'defaultValue'
                            }
                        }
                    },
                    {
                        opcode: 'getEditorKey',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get from editor keys [key]',
                        arguments: {
                            key: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'defaultKey'
                            }
                        }
                    }
                ]
            };
        }

        setData(args) {
            const keys = args.path.split('.');
            let currentLevel = this.dataStore;

            keys.forEach((key, index) => {
                if (index === keys.length - 1) {
                    currentLevel[key] = args.value; // Define o valor na chave do objeto
                } else {
                    currentLevel[key] = currentLevel[key] || {}; // Cria um objeto se não existir
                    currentLevel = currentLevel[key];
                }
            });
        }

        getData(args) {
            const keys = args.path.split('.');
            let currentLevel = this.dataStore;

            for (const key of keys) {
                if (currentLevel[key] === undefined) {
                    return 'undefined';
                }
                currentLevel = currentLevel[key];
            }

            return currentLevel || 'undefined';
        }

        createFile(args) {
            if (typeof window !== 'undefined') {
                const fileName = args.fileName;
                const fileValue = args.fileValue;

                console.log(`Creating file: ${fileName} with value: ${fileValue}`);
            } else {
                console.warn('This functionality is only available in the PC version.');
            }
        }

        readFile(args) {
            if (typeof window !== 'undefined') {
                const filePath = args.filePath;
                console.log(`Reading file: ${filePath}`);
                return 'file content'; // Retorna um conteúdo de exemplo
            } else {
                console.warn('This functionality is only available in the PC version.');
                return 'undefined';
            }
        }

        setEditorKey(args) {
            this.dataStore[args.key] = args.value; // Define uma chave diretamente no objeto
            console.log(`Set editor key: ${args.key} to ${args.value}`);
        }

        getEditorKey(args) {
            return this.dataStore[args.key] || 'undefined'; // Obtém o valor da chave
        }
    }

    Scratch.extensions.register(new MemoryData());
})(Scratch);
