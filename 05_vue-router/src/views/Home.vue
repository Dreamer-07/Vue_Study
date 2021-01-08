<template>
    <h2>Home</h2>
    <div id="contains">
        <aside>
            <h3>巴御前天下第一！</h3>
            <ul>
                <li>
                    <router-link to="/home/news"> News </router-link>
                </li>
                <li>
                    <router-link to="/home/messages"> Messages </router-link>
                </li>
            </ul>
        </aside>
        <div>
            <router-view />
        </div>
    </div>
</template>

<style>
    *{
        padding: 0;
        margin: 0;
    }
    ul,li {
        list-style: none;
        text-align: left;
    }
    #contains {
        display: flex;
        width: 400px;
        margin: auto;
    }
    #contains > aside {
        width: 150px;
    }
    #contains > div {
        padding-top: 20px;
    }
</style>