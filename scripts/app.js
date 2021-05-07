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
            return this.usersList.filter((user) => {
                let searchedChat = this.chatFilter.toLowerCase();
                let friendName = user.name.toLowerCase();
                if (friendName.includes(searchedChat)) {
                    return true;
                } else {
                    return false;
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
            if (!message.showPopUp) {
                this.$set(message, "showPopUp", true);
            } else {
                this.$set(message, "showPopUp", false)
            }
        },

        getLastChatMessage(messages) {
            if (messages.length === 0) {
                return "Non ci sono messaggi!"
            }

            let lastMsg = messages[messages.length - 1];
            const lastMsgDate = this.formatTime(lastMsg.date);

            let trimmedMsg = lastMsg.text.slice(0, 15);

            if (lastMsg.text.length > 15) {
                trimmedMsg += "...";
            } 

            return trimmedMsg + " - " + lastMsgDate
        }
    },  
    
    mounted(){


        moment().format("DD/MM/YYYY HH:mm:ss");

        this.usersList.forEach(user => {
            user.messages.forEach(message => {
                this.$set(message, "showPopUp", false);
            });
        });
    }

})