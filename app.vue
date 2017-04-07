<template>
    <div>
        <HeaderVue></HeaderVue>
        <transition name="bounce">
            <router-view></router-view>
        </transition>
        <FooterVue></FooterVue>
    </div>
</template>
<script>
import HeaderVue from './components/partials/header.vue';
import FooterVue from './components/partials/footer.vue';
export default {
    data() {
        return {

        }
    }, components: {
        HeaderVue,
        FooterVue,
    }
}
</script>
<style scoped>
.bounce-enter-active {
    animation: bounce-ina .5s;
}

@keyframes bounce-ina {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.5);
    }
    100% {
        transform: scale(1);
    }
}
</style>
