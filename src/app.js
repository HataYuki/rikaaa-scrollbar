import ready from './assets/js/_Domready';

ready(() => {
    var wp = document.querySelector('.wp'),
        article = document.querySelector('article'),
        header = document.querySelector('header'),
        wp_inner = document.querySelector('.wp-inner'),
        fit = function () {
            wp.style.width = window.innerWidth + 'px';
            wp.style.height = window.innerHeight + 'px';
            article.style.height = (wp_inner.offsetHeight - header.offsetHeight) + 'px';
        };
    
    window.addEventListener('resize', fit);
    fit();
    
    var scrollbar = document.getElementById('scrollbar');
    scrollbar.addEventListener('load', function () {
        console.log('load');
        scrollbar.navi([
            {
                name: "demo",
                id: "demo"
            },
            {
                name: "issue",
                id: "issue"
            },
            {
                name: "installation",
                id: "installation"
            },
            {
                name: "usage",
                id: "usage"
            },
            {
                name: "events",
                id: "events"
            },
            {
                name: "getters",
                id: "getters"
            },
            {
                name: "methods",
                id: "methods"
            },
            {
                name: "attributes",
                id: "attributes"
            }
        ]);
    });
    
    
    // const demo1 = document.getElementById('demo1');
    // const demo1Parent = demo1.parentNode;
    // demo1Parent.removeChild(demo1);





});