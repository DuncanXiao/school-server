import fs from 'fs';
import path from 'path';

export const getFilesName = (options, files=[]) => {
	const fileNames = fs.readdirSync(options.rootPath);
	fileNames.forEach((fileName) => {
		if (!/(.js)$/.test(fileName)) {
			getFilesName({rootPath:`${options.rootPath}/${fileName}`, 
				ignoreFilesName: options.ignoreFilesName}, files);
		} else if (/(.js)$/.test(fileName) && options.ignoreFilesName.indexOf(fileName) == -1) {
			files.push(fileName);
		}
	});
	return files;
};

export const getFilesPath = (options, paths=[]) => {
	let filesPath = [];
	if (options.relativePath) {
		filesPath = fs.readdirSync(`${options.rootPath}${options.relativePath}`);
	} else {
		options.relativePath = '';
		filesPath = fs.readdirSync(options.rootPath);
	}
	filesPath.forEach((filePath) => {
		const relativePath = `${options.relativePath}/${filePath}`;
		if (!/(.js)$/.test(filePath)) {
			getFilesPath({rootPath: options.rootPath, 
				relativePath: relativePath, 
				ignoreFilesName: options.ignoreFilesName}, paths);
		} else if (/(.js)$/.test(filePath) && options.ignoreFilesName.indexOf(filePath) == -1) {
			paths.push(relativePath);
		}
	});
	return paths;
};

export const getAppPath = () => {
	const rootPath = path.resolve(__dirname, '../../server');
	const filesPath = fs.readdirSync(rootPath);
	const appPaths = [];
	filesPath.map((fileName) => {
		if (/App$/.test(fileName)) {
			appPaths.push(`${rootPath}/${fileName}`);
		}
	});
	return appPaths;
};