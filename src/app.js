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

    var main = document.getElementById('main');
    main.addEventListener('load', function () {
        main.navi([
            { name: "page top", id: "t1" },
            { name: "Issue", id: "t2" },
            { name: "Installation", id: "t3" },
            { name: "Usage", id: "t4" },
            { name: "Attribute", id: "t5" },
        ]);
    });
});