export function scrollIntoView(temp){
	// const container = temp;
 //    container.scrollTop = container.scrollHeight;
}

export function fomatTime(time){
	var date = new Date(time)
	return date.getHours()+':'+date.getMinutes() 
}
