const app = new Vue({
    el: "#app",
    data: {
        usersList: globalUsersList,
        activeUser: "", 
        userInput: "",
        chatFilter: "",
    },

    computed: {
        activeUserLastAccess() {
            if (!this.activeUser.messages) {
                return "";
            }

            const receivedMsg = this.activeUser.messages.filter((msg) => msg.status === 'received');

            if(receivedMsg.length === 0) {
                return "";
            }

            const lastMsgDate = receivedMsg[receivedMsg.length - 1].date;

            return this.formatTime(lastMsgDate);
        },

        searchUser() {
            this.usersList.filter((user) => {
                let searchedChat = this.chatFilter.toLowerCase();
                let friendName = user.name.toLowerCase();
                if (friendName.includes(searchedChat)) {
                    user.visible = true;
                } else {
                    user.visible = false;
                }
            })
        },
    },

    methods: {
        onUserClick(clickedUser) {
            this.activeUser = clickedUser
        },

        onTimesClick() {
            return this.chatFilter = ""
        },

        formatTime(stringDate) {
            return moment(stringDate, "DD/MM/YYYY HH:mm:ss").format("HH:mm")
        },

        newMessage (){
            this.activeUser.messages.push({
                date: moment().format("DD/MM/YYYY HH:mm:ss"),
                text: this.userInput,
                status: 'sent'
            });

            this.scrollToBottom();

            setTimeout(() => {
                this.activeUser.messages.push({
                    date: moment().format("DD/MM/YYYY HH:mm:ss"),
                    text: "Ok!",
                    status: 'received',
                })

                this.scrollToBottom();
            },1000)

            return this.userInput = ""
        },

        scrollToBottom() {

            this.$nextTick(() => {
                const htmlElement = this.$refs.chatContainerToScroll;
                
                htmlElement.scrollTop = htmlElement.scrollHeight;
            })
              
        },

        deleteMessage(index) {
            this.activeUser.messages.splice(index, 1)
        },

        changePopUpVisibility(message) {
            this.$set(message, "showPopUp", false);
        }
    },  
    
    mounted(){

        //this.activeUser = this.usersList[0];

        moment().format("DD/MM/YYYY HH:mm:ss");

        this.usersList.forEach(user => {
            user.messages.forEach(message => {
                this.$set(message, "showPopUp", false);
            });
        });
    }

})