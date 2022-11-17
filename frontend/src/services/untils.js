export function scrollIntoViewBottom(idScroll){
	var element = document.getElementById(idScroll);
	if(element){
		element.scrollTop = element.scrollHeight;
	}
}

export function fomatTime(time){
	var date = new Date(time)
	return date.getHours()+':'+date.getMinutes() 
}
export function fomatDate(time){
	var date = new Date(time)
	return date.getDate()+'/'+(date.getMonth()+1)+"/"+date.getFullYear() 
}
