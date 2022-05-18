<template>
    <p class="Location">
        <a href="../dashboard/dashboard.do" class="btn_set home">메인으로</a>
        <span class="btn_nav bold">{{ nav }}</span>
        <span class="btn_nav bold"> {{ navDetail }}</span>
        <a @click="urlReload()" class="btn_set refresh">새로고침</a>  
    </p>
</template>

<script>

    export default {
        name: 'homeNav',
        props: {nav : String, navDetail : String},
        data() {
            return {
                url : window.location.href
            }
        },
        methods: {
            urlReload: function() {
                location.reload();
            }
        },
        mounted() {
            console.log(this.url);
        },
    }
</script>