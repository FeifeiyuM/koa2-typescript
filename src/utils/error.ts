export const errAnal = function(ctx, errs) {
	let result = {Error: true}
	try {
		for(let err of errs) {
			if(err.type === 'validation') {
				result[err.property] = err.msg
			}
		}
	} catch(e) {
		if(errs.message) {
			result['detail'] = errs.message
		} else {
			result['detail'] = errs
		}
		
	}
	ctx.status = 400
	ctx.body = JSON.stringify(result)
}