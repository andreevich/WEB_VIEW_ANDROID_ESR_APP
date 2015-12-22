# WEB VIEW ANDROID ESR APP
css display table js

Web Представление интерфейса android app ЕСР (https://play.google.com/store/apps/details?id=rw.esr)
Вариант с display:table


```css
.item_tbl_1{
  display: table;
}
...
.item_td{
  display: table-cell;
}
```	
```javascript
React.render(
		<StationBlock />, document.getElementById('itemsID')
	);
```
\+ IE8 как-то не работает с display: table без
```html 
<meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
``` 



# что получилось
![Alt-screenshot](https://github.com/andreevich/WEB_VIEW_ANDROID_ESR_APP/blob/master/web%20view.jpg?raw=true "Screenshot")
# к чему стремились
![Alt-screenshot](https://github.com/andreevich/WEB_VIEW_ANDROID_ESR_APP/blob/master/android%20app.jpg?raw=true "Screenshot")
![Alt-screenshot](https://github.com/andreevich/WEB_VIEW_ANDROID_ESR_APP/blob/master/dom.jpg?raw=true "Screenshot")
скрин из ie8
![Alt-screenshot](https://github.com/andreevich/WEB_VIEW_ANDROID_ESR_APP/blob/master/img/2015-12-15_14-00-11.jpg?raw=true "ie8")


