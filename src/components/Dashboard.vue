<template>
    <v-container grid-list-md id="dashboard">
        <v-layout row wrap class="pt-5">
            <v-flex md12 xs12>
                <v-card light>
                    <bar></bar>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    import Bar from './chart/Bar'

    export default {
        name: 'Dashboard',
        components: {
            Bar
        },
        mounted() { }
    }
</script>
<style>
    #dashboard .flex {
        margin-bottom: 16px
    }
</style>