module.exports = {
	port: process.env.PORT || 5000,
	DB: {
		uri: process.env.MONGOO_URI || 'mongodb+srv://thanh:w1zqVPs5UfWnFJVK@cluster0.ci2u2.mongodb.net/chats?retryWrites=true&w=majority',
	},
	socket:{
		onlines: [],
		admin:[],
	},
	user:{},
	dowloadFile: (filename)=>{
		return 'http://localhost:5000/uploads/' + filename
	}
}