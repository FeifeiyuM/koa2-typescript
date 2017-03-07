enum UserType {
	super = 0,
	normal = 1,
	operator = 2
}

export const userAuth = async (ctx, next) => {
	if(ctx.session.isLogin) {
		await next()
	} else {
		ctx.status = 403
		ctx.body = {ERROR: 'user is not autherized'}
	}
}