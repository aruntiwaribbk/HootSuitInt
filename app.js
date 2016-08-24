$(document).ready(function() {
	// alert(2);
	
	
	// function getUrlVars()
// {
    // var vars = [], hash;
    // var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    // for(var i = 0; i < hashes.length; i++)
    // {
        // hash = hashes[i].split('=');
        // vars.push(hash[0]);
        // vars[hash[0]] = hash[1];
    // }
    // return vars;
// }
	
	
	
	
	// var secret = 'sharedSecretABCD1234'; 
 // var user_id   =getUrlVars()["i"];// GetQueryStringParams('i');
 // var timestamp =getUrlVars()["ts"]; //GetQueryStringParams('ts');
 // var token     =getUrlVars()["token"];// GetQueryStringParams('token');
 // alert(1);
 // alert(user_id);
 // if (sha512(user_id,timestamp,secret) == token)
 // {
    // alert('success');
 // }
 // else
 // {
	 // alert('failure');
	
 // }
    hsp.init({
		 apiKey: 'dixrr8363jswk0wowsgc80k0k3ie33dahak',
		 receiverPath: 'https://hootuitintegration.herokuapp.com/my_receiver.html',
        useTheme: true,
		 callBack: function (message) {
                  
                    console.log('Error: ' + message);
                }
    });
	
	
	hsp.getData(function(data)

{
console.log('App gets data', data);
alert(data);
});
	
	
    $('._message_send').click(function(){
		alert('composeMessage');
        hsp.composeMessage($('._message_text').val());
    });

    $('._user_search').click(function(){
		alert('showUser');
        hsp.showUser($('._user_text').val());
    });

    $('._composeMessage').click(function(){
		alert('composeMessage');
        hsp.composeMessage('- sending from the new Appdirecoty SDK');
    });

    $('._retweet').click(function(){
		alert('retweet');
		
			 hsp.retweet($('#hs_RetweetInputExample').val());
		
		
    });

    $('._showUser').click(function(){
		alert('showUser');
        hsp.showUser('Hootsuite');
    });

    $('._getTwitterAccounts').click(function(){
	
        hsp.getTwitterAccounts(function(data){
				alert('getTwitterAccounts');
            //log('gettwitteraccounts', data);
        })
    });

    $('._showStatusMessage').click(function(){
		alert('showStatusMessage');
        hsp.showStatusMessage('New Appdirectory SDK', 'INFO');
    });

    $('._clearStatusMessage').click(function(){
        hsp.clearStatusMessage();
    });

    $('._showFollowDialog').click(function(){
        hsp.showFollowDialog('Hootsuite', true);
    });

    $('._customUserInfo').click(function(){
        hsp.customUserInfo({
          "fullName": "arun",
          "screenName": "@arun22755309",
          "avatar": "https://d1cmhiswqj5a7e.cloudfront.net/http%3A%2F%2Fplacehold.it%2F30x30%2F444",
          "profileUrl": "https://twitter.com/arun22755309",
          "userLocation": "India",
          "bio": ".Net Developer",
          "extra": [
            {"label": "Age", "value": "Unknown"},
            {"label": "Gender", "value": "Male"}
          ],
          "links": [
            {"label": "Hootsuite", "url": "https://hootsuite.com"},
            {"label": "Blog", "url": "https://blog.hootsuite.com"}
          ]
        });
    });

    $('._showImagePreview').click(function(){
        hsp.showImagePreview( 
            'http://www.adweek.com/files/imagecache/node-blog/blogs/hootsuite-owl-holidays-hed-2014.jpg', 
            'http://ow.ly/G4OlN');
    });

    $('._updatePlacementSubtitle').click(function(){
        hsp.updatePlacementSubtitle('New Appdirectory SDK');
    });

    $('._showCustomPopup').click(function(){
        hsp.showCustomPopup('https://hootsuite.com/holidayowl?hootPostID=ab9f1ce42ce8f04cb6595fee079f099e', 'App Popup', 800, 600);
    });

    $('._closeCustomPopup').click(function(){
        hsp.closeCustomPopup('2x6zyxglj36s4ockg8c8s0k4o3ibhago7n4','82802');
    });

    $(document).on('click', '._compose', function() {
        var $messageBox = $(this).closest('._messageBox');
        hsp.composeMessage($messageBox.find('._content').text());
    });

    hsp.bind('sendcomposedmsgtoapp', function(message){
		alert('sendcomposedmsgtoapp');
		alert(message.post.user.userid);
        console.log('received composed message:', message);
    });

    hsp.bind('dropuser', function(username, tweetId){
		alert(tweetId);
        $('.hs_topBar').after(messageTemplate({
            // input: 'user ' + username + ' dropped',
			 input: 'https://twitter.com/'+username+'/status/'+tweetId,
            username: username,
            avatar: 'http://avatars.io/twitter/' + username,
          //  messageId: parseInt(1000000*Math.random(), 10) //generate random message ID for demonstration purposes
			 messageId: tweetId
        }));
    });

    hsp.bind('sendtoapp', function(message){
		alert('sendtoapp');
        var userid = message.post.user.userid;
        var username = message.post.user.username;
        var avatar;
        if (message.post.network == 'twitter') {
            avatar = 'http://avatars.io/twitter/' + username;
        } else {
            avatar = 'http://avatars.io/facebook/' + userid;
        }
        

        $('.hs_topBar').after(messageTemplate({
            input: message.post.content.body,
            username: username,
            avatar: avatar,
            messageId: parseInt(1000000*Math.random(), 10) //generate random message ID for demonstration purposes
        }));
    });

    hsp.bind('sendprofiletoapp', function(profile){
alert('sendprofiletoapp');
        if (profile.network == 'TWITTER') {
            avatar = 'http://avatars.io/twitter/' + profile.screen_name;
        } else {
            avatar = 'http://avatars.io/facebook/' + profile.id;
        }

        $('.hs_topBar').after(messageTemplate({
            input: 'Profile received: ' + profile.name,
            username: profile.name,
            avatar: avatar,
            messageId: parseInt(1000000*Math.random(), 10) //generate random message ID for demonstration purposes
        }));
    });

    hsp.bind('sendassignmentupdates', function(data){
		alert('sendassignmentupdates');
        var $messageBox = $('._message_' + data.messageId);
        $messageBox.attr('assignmentId', data.assignmentId);

        //Let's play with the colors
        if (data.status == "OPENED") {
            $messageBox.addClass('hs_message_assigned');
            var $currentMessageAssignment = $messageBox.find('._messageAssignment');
            if ($currentMessageAssignment.length) {
                $currentMessageAssignment.remove();
            }
            $messageBox.prepend(window.assignedTemplate({
                name: data.toName
            }));

        } else if (data.status == "RESOLVED") {
            $messageBox.addClass('hs_message_assigned');
            var $currentMessageAssignment = $messageBox.find('._messageAssignment');
            if ($currentMessageAssignment.length) {
                $currentMessageAssignment.remove();
            }
            $messageBox.prepend(window.resolvedTemplate({}));
        }


    });

    $(document).on('click', '._assign', function() {
		alert('assignItem');
        var $messageBox = $(this).closest('._messageBox');
        var params = {
            messageId: $messageBox.attr('messageId'),
            message: $messageBox.find('._content').text(),
            messageAuthor: $messageBox.find('._username').text(),
            messageAuthorAvatar: $messageBox.find('.hs_avatarImage').attr('src')
        };

        $messageBox.addClass('_message_' + params.messageId);
        hsp.assignItem(params);
    });

    $(document).on('click', '._resolve', function() {
		alert('resolveItem');
        var $messageBox = $(this).closest('._messageBox');
        if (!$messageBox.attr('assignmentId')) {
            alert('Please assign this ticket before resolving it.');
            return;
        }

        var params = {
            assignmentId: $messageBox.attr('assignmentId')
        };

        hsp.resolveItem(params);

    });

    window.assignedTemplate = _.template(
        '<div class="hs_assignment _messageAssignment">' +
            '<span class="icon-app-dir x-assigned-on"></span>' +
            '<span class="notes _notes">Message assigned to <b><%= name%></b></span>' +
        '</div>');

    window.resolvedTemplate = _.template(
        '<div class="hs_assignment _messageAssignment">' +
            '<span class="icon-app-dir x-resolved-on"></span>' +
            '<span class="notes _notes">Message resolved</span>' +
        '</div>');

    window.messageTemplate = _.template(
        '<div class="hs_message _messageBox" messageId="<%= messageId%>">' +
            '<div class="hs_messageOptions">' +
                '<button class="hs_messageOptionsBtn icon-app-dir x-compose _compose" title="Compose"></button>' +
                '<button class="hs_messageOptionsBtn hs_messageDropDownBtn icon-app-dir x-ellipsis"></button>' +
                '<div class="hs_moreOptionsMenu">' +
                    '<a class="hs_moreOptionsMenuItem _assign" href="#"><span class="icon-app-dir x-assigned"></span>Assign</a>' +
                    '<a class="hs_moreOptionsMenuItem _resolve" href="#"><span class="icon-app-dir x-resolved"></span>Resolve</a>' +
                '</div>' +
            '</div>' +
            '<div class="hs_avatar">' +
                '<img class="hs_avatarImage" src="<%= avatar %>" alt="Avatar">' +
                '<a href="#" class="hs_avatarLink"></a>' +
            '</div>' +
            '<div class="hs_content">' +
                '<a href="#" class="hs_userName _username" title="Username"><%= username %></a>' +
                '<a href="#" class="hs_postTime hs_isNewMessage" target="_blank" title="Sunday, September 14 2014 at 12:00pm via Hootsuite">now</a>' +
                '<div class="hs_contentText _content">' +
                    '<p><%= input %></p>' +
                '</div>' +
            '</div>' +
        '</div>');
});





