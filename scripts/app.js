const app = new Vue({
    el: "#app",
    data: {
        usersList: globalUsersList,
        activeUser: "", 
    },

    methods: {
        onUserClick(clickedUser) {
            this.activeUser = clickedUser
        }
    }

})