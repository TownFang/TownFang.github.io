hexo.extend.injector.register('head_end', '<script src="/js/jquery-3.6.1.min.js"></script>', 'default');
hexo.extend.injector.register('head_end', '<script src="/js/circleMagic.min.js"></script>', 'default');
hexo.extend.injector.register('head_end', '<meta name="keywords" content="姿平的博客,原创博客">', 'default');

hexo.extend.injector.register('body_end', `<script>


    $('#page-header').circleMagic({
                radius: 10,
                density: .3,
                color: 'rgba(255,255,255, .4)',
                //color: 'random',
                clearOffset: .3
            });
</script>`, 'default');
