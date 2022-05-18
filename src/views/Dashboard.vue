<template>

    <!--GLOBAL MASKING -->
    <div id="mask"></div>


    <!-- GLOBAL WRAP -->
    <div id="wrap_area">
        <!-- Content area -->
        <div id="container">
            <ul>
                <li class="lnb">
                    <!-- lnb area -->
                    <Menu></Menu>
                </li>
                <li class="contents">
                    <!-- content AREA -->
                    <!-- connecting to router view -->
                    <div class="content">
                        <router-view :type="type" :menu="menu"></router-view>
                    </div>
                </li>
            </ul>
        </div>
    </div>

</template>



<script>

    import Menu from "@/components/leftMenu.vue";
    

    export default{
        data:function(){
            return{
                /* type:this.$route.params.type,
                menu:this.$route.params.menu */
                type:this.$route.params.type,
                menu:this.$route.params.menu
            }
        },
        watch:{
            $route(to){
                this.type=to.params.type;
                this.menu=to.params.menu;
            }
        },
        created:function(){
            console.log(this.$route.params.type);
            console.log(this.$route.params.menu);
            this.type=this.$route.params.type;
            this.menu=this.$route.params.menu;
            let loginInfo=this.$session.get('loginInfo');

            if(loginInfo==null){
                alert('로그인 정보가 없습니다');
                location.href="/";
            }else{

                console.log('dashboard finished created');

                
                // vm.$root.$router.addRoute('dashboard',{path:"home",component:()=>import('@/views/Home.vue')});
            }
        },
        components:{Menu}
    }
</script>