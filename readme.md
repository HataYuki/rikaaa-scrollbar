# `<rikaaa-scrollbar>`
![](rikaaa-scrollbar.gif)


## Installation
```bash
#script
<!-- If you want to use The Custom Element -->
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.2.10/webcomponents-loader.js"></script>

<script src="rikaaa-scrollbar.js"></script>
```
```bash
#esm
import "rikaaascrollbar" from "rikaaa-img-scrollbar.esm";

customElements.define("rikaaa-scrollbar", rikaaascrollbar);
```

## Usage 
You need to specify the height for 'rikaaa-scrollbar' tag or its parent element!.
```bash
<rikaaa-scrollbar style="height:500px";>
  write in your content
</rikaaa-scrollbar>
``` 

## example 
HTML
``` bash
<div class="wp">
     <div class="wp-inner">
          <headr>
              write in your content.
          </headr>
          <article>
              <rikaaa-scrollbar id="main">
                  <div> <!-- <== Require!! -->
                      <section id="t1">write in your content.</section>
                      <section id="t2">write in your content.</section>
                      <section id="t3">write in your content.</section>
                      <section id="t4">write in your content.</section>
                      <section id="t5">write in your content.</section>
                  </div>
              </rikaaa-scrollbar>
          </article>
     </div>
 </wp>
```

Javascript
```bash
var wp = document.querySelector(".wp"),
      article = document.querySelector("article"),
      header = document.querySelector("header"),
      wp_inner = document.querySelector(".wp-inner"),
      fit = function () {
        wp.style.width = window.innerWidth + "px";
        wp.style.height = window.innerHeight + "px";
        article.style.height = (wp_inner.offsetHeight - header.offsetHeight) + "px";
      };

window.addEventListener("resize", fit);
fit();
```
if you want to use navigation.
```bash
var main = document.getElementById("main");

main.addEventListener("load", function () {
    console.log("load");
    main.navi([
        { name: "page top", id: "t1" },
        { name: "Issue", id: "t2" },
        { name: "Installation", id: "t3" },
        { name: "Usage", id: "t4" },
        { name: "Attribute", id: "t5" },
    ]);
});
```


## Attribute
| Atrribute | Description |
----|----
| minwidth = "integer" | The parameter to set the maximum width of bar by integral number. The unit is pixel. default value is 8. |
| maxwidth = "integer" | The parameter to set the minimum width of bar by integral number. The unit is pixel. default value is 8. |
| autohide = "boolean" | The parameter to set availability of whether to allow bar to be hidden automatically by truth value. default is 'true'. |
| usenavi = "boolean"|The parameter to set availability of whether to use navigation function or not by truth value. default is 'true'. |

## Browser Support
- Google Chrome  
- Safari  
- Firefox  
- Edge  
- IE 11+ (When using polyfill)

## License
MIT © [rikaaa.org](http://rikaaa.org/)
