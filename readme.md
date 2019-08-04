# `<rikaaa-scrollbar>`
The Custom Element in order to impliment simple scrollBar function.  
![](rikaaa-scrollbar.gif)

## Issue
1. Currently, The Custom Element does not support horizontal scroll bars.

## Installation
```bash
#HTML
<!-- If you want to use the Custom Element with browser without not support Webcomponents. -->
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.2.10/webcomponents-loader.js"></script>

<script src="rikaaa-scrollbar.js"></script>
```

## Usage 
You need to specify the height for 'rikaaa-scrollbar' tag or its parent element!.


```bash
#HTML
<rikaaa-scrollbar style="height:500px";>
  write in your content
</rikaaa-scrollbar>
``` 

or

```bash
#HTML
<section style="height:500px;">
  <rikaaa-scrollbar>
    <div>
        write in your content
    </div>
  </rikaaa-scrollbar>
</section>
``` 

## Events
- __main.addEventListener("load",callback)__  
_he event will be triggered the custom element loaded._
```bash
var scrollbar = document.querySelector("rikaaa-scrollbar");

scrollbar.addEventListener("load", function () {
    console.log("load");
});
```

## Getters
| Getter | Description |
----|----
|rikaaascrollbar.root|The value is Element as View-port.|

## Methods
- __rikaaascrollbar.navi(Array);__  
_The methods will be activate Smooth Scroll._
```bash
var scrollbar = document.querySelector("rikaaa-scrollbar");

scrollbar.addEventListener("load", function () {
    console.log("load");
    scrollbar.navi([
        { name: "aaaaa", id: "The id Attribute of html element" },
        { name: "bbbbb", id: "The id Attribute of html element" },
        { name: "ccccc", id: "The id Attribute of html element" },
        { name: "ddddd", id: "The id Attribute of html element" },
        { name: "eeeee", id: "The id Attribute of html element" },
    ]);
});
```

## Attributes
| Atrribute | Description |
----|----
| minwidth = "integer" | The parameter to set the maximum width of bar by integral number. The unit is pixel. default value is 8. |
| maxwidth = "integer" | The parameter to set the minimum width of bar by integral number. The unit is pixel. default value is 8. |
| autohide = "boolean" | The parameter to set availability of whether to allow bar to be hidden automatically by truth value. default is 'true'. |
| usenavi = "boolean"|The parameter to set availability of whether to use navigation function or not by truth value. default is 'true'. |

## Change Log
1. v1.1.0
    - The "root" getter added.

## Browser Support
- Google Chrome  
- Safari  
- Firefox  
- Edge  
- IE 11+ (When using polyfill)

## License
MIT © [rikaaa.org](http://rikaaa.org/)
