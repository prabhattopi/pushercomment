(function(){
    Pusher.logToConsole=true;
    const serverUrl="https://vscode-akble.run-ap-south1.goorm.site/proxy/5000/";
    const comments=[];
    const pusher=new Pusher(process.env.key, {
        cluster: process.env.cluster,
        encrypted: true,
    });
    const channel=pusher.subscribe("pusherchat");
    const commentForm=document.getElementById("comment-form");
    const commentsList=document.getElementById("comments-list");
    const commentTemplate=document.getElementById("comment-template");
    channel.bind('new_comment', function(data) {

        alert('Received my-event with message: ' + data.comment);
      
      });
    commentForm.addEventListener("submit", addNewComment);

    function addNewComment(event) {
        event.preventDefault();
        const newComment = {
            name: document.getElementById("new_comment_name").value,
            email: document.getElementById("new_comment_email").value,
            comment: document.getElementById("new_comment_text").value
        };

        const xhr = new XMLHttpRequest();
        xhr.open("POST", serverUrl + "comment", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4 || xhr.status != 200) return;
            console.log("Success" + xhr.responseText);
            commentForm.reset();
        };

        xhr.send(JSON.stringify(newComment));
    }
})();
