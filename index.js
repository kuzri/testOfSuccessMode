'use strict';

// var getDaysInMonth = function(month,year) {
//    return new Date(year, month, 0).getDate();
//   };

// const res = fetch('https://rest.dealink.co.kr/auction/group/2?page=0&size=3&sort=createdDate,desc',{
// 	method:'GET'
// })
// .then(response=>response.json())
// .then(result=>console.log(result[0].closingTime))
// .catch(error=>Error(error))



const res = fetch('https://rest.dealink.co.kr/auction/group/2?page=0&size=3&sort=createdDate,desc',{
	method:'GET'
})
.then(response=>response.json())
.then(function(result){
	for(const goodsId in result){
		document.querySelector('.div' + goodsId).innerHTML = 
		timer(getDistance(result[goodsId]))+
		`<div>
			<img src="${result[goodsId].imagePath}" width="200px" height="200px"/><br/>
			<h3>${result[goodsId].productName}</h3>
			<span>${result[goodsId].description}</span>
			<br/><br/><br/><br/>
		</div>
		`;
	}
})
.catch(error=>Error(error));


function getDistance(time1){
	 const time2 = new Date().toISOString().substr(0, 19);
	 const distance = new Date(time1.closingTime).getTime() - new Date(time2).getTime();
	 return distance;
	};

// getDistance와 timer를 분리시킬 필요가 있음

function timer (distance){
	const day = Math.floor(distance/(1000*60*60*24));
	const hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
	const minutes = Math.floor((distance % (1000*60*60))/(1000*60));
	const seconds = Math.floor((distance % (1000*60))/1000);

	return distance<=0? "경매 종료" : 
	`D-${day} ${hours < 10 ? `0${hours}` : hours}:
	${minutes < 10 ? `0${minutes}` : minutes}:
	${seconds < 10 ? `0${seconds}` : seconds}남음`;
}   ;