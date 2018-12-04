import BaseModel from './baseModel';

class EmailModel extends BaseModel {
	constructor (options={}) {
		Object.assign(options, {modelName: 'emailModel'});
		super(options);
	}
}

export default EmailModel;