<template>
    <v-container grid-list-md id="dashboard">
        <v-layout row wrap class="pt-5">
            <v-flex md6 xs12>
                <v-card light>
                    <doughnut></doughnut>
                </v-card>
            </v-flex>
            <v-flex md6 xs12>
                <v-card light>
                    <bar></bar>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    import Bar from './chart/Bar'
    import Doughnut from './chart/Doughnut'
    export default {
        name: 'Dashboard',
        components: {
            Bar,
            Doughnut
        },
        mounted() { }
    }
</script>
<style>
    #dashboard .flex {
        margin-bottom: 16px
    }
</style>