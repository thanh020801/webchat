export function scrollIntoView(temp){
	// const container = temp;
 //    container.scrollTop = container.scrollHeight;
}

export function fomatTime(time){
	var date = new Date(time)
	return date.getHours()+':'+date.getMinutes() 
}
export function fomatDate(time){
	var date = new Date(time)
	return date.getDate()+'/'+(date.getMonth()+1)+"/"+date.getFullYear() 
}
