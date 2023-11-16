const APPETIZER = Object.freeze([
	{
		name: '양송이수프',
		price: 6000,
	},
	{
		name: '타파스',
		price: 5500,
	},
	{
		name: '시저샐러드',
		price: 8000,
	},
]);

const MAIN = Object.freeze([
	{
		name: '티본스테이크',
		price: 55000,
	},
	{
		name: '바비큐립',
		price: 54000,
	},
	{
		name: '해산물파스타',
		price: 35000,
	},
	{
		name: '크리스마스파스타',
		price: 25000,
	},
]);

const DESSERT = Object.freeze([
	{
		name: '초코케이크',
		price: 15000,
	},
	{
		name: '아이스크림',
		price: 5000,
	},
]);

const BEVERAGE = Object.freeze([
	{
		name: '제로콜라',
		price: 3000,
	},
	{
		name: '레드와인',
		price: 60000,
	},
	{
		name: '샴페인',
		price: 25000,
	},
]);

const MENU = Object.freeze({
	appetizer: {
		korTitle: '애피타이저',
		menu: APPETIZER,
	},
	main: {
		korTitle: '메인',
		menu: MAIN,
	},
	dessert: {
		korTitle: '디저트',
		menu: DESSERT,
	},
	beverage: {
		korTitle: '음료',
		menu: BEVERAGE,
	},
});

export default MENU;
