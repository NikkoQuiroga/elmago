/* ---------------------------------------------
                  Social-Proof
------------------------------------------------ */
var sp_freqency = 14500;
var sp_timeout = 1200;
var popbackup = "";

var names = ["Anonymous", "Anonymous", "Anonymous", "Someone", "Someone", "Irma", "Frank", "Ella", "Liz", "Sasha", "Mariella", "Jeremy", "Virginia", "Charles", "Karina", "Vihaan", "Reyansh", "Krishna", "Akshay", "Rajesh"];
var towns = ["Portland","Hillsboro","Beaverton","Bethany","Aloha","Tigard","King City","Forest Grove","Rock Creek","Raleigh Hills","Garden Home","East Portland","Tualatin"];

var pastactions = ["Upgraded to VIP", "Recieved a ceramic coating", "Booked an interior + exterior detail", "Had their paint polished", "Left a 5-star review", "Had their leather conditioned", "Had their car deodorized", "Booked a custom service"];
var recentactions = ["Booked an appointment this week", "Booked an appointment", "Just booked an appointment", "Just booked an interior detail","Left a positive review", "Scheduled Online", "Changed their appointment time", "Added a concern area to their service notes", "Requested a custom quote", "Is browsing the Before/After Gallery", "read a blog post", "Sent a question via SMS", "Is visiting our facebook page"];
var futureactions = ["Scheduled for this week", "On the schedule", "Scheduled for an interior detail", "Protecting their investment with a ceramic coating", "Having their vehicle polished and sealed", "Getting a full odor removal"];
// set data for the first time
fn_UpdateSocialProofData();
$(".custom-social-proof").stop().slideToggle('slow');

// set interval for popping up/down
var togglevar = setInterval( function() { 
  fn_ToggleSocialProof();
}, sp_freqency); //every 14 seconds as defined by sp_freqency var

// set what to do on close
$(".custom-close").click(function() {
  //Stop all timers and hide social proof
  clearTimeout(popbackup);
  clearTimeout(togglevar);
  $(".custom-social-proof").stop().slideToggle('slow');
});

function fn_UpdateSocialProofData() {
  var selectedname = names[Math.floor(Math.random() * names.length)];
  var selectedtown = towns[Math.floor(Math.random() * towns.length)];  
  
  // always select a recent action as a fallback
  var selectedaction = recentactions[Math.floor(Math.random() * recentactions.length)];
  var timeperiod = fn_RecentTimeGen();
  // sometimes choose something older
  if (fn_Percentage(80)) {
    selectedaction = pastactions[Math.floor(Math.random() * pastactions.length)];
    timeperiod = fn_PastTimeGen();
  }
  // sometimes choose something tomorrow
  if (fn_Percentage(33)) {
	  selectedaction = futureactions[Math.floor(Math.random() * futureactions.length)];
	  timeperiod = fn_FutureTimeGen();
  }


	$( "#sp_customername" ).text( selectedname );
	$( "#sp_location" ).text( selectedtown );
	$( "#sp_actionname" ).text( selectedaction );
	$( "#sp_time" ).text( timeperiod );
	// console.log("updated socialproof");
}

function fn_ToggleSocialProof() {
    $(".custom-social-proof").stop().slideToggle('slow', function() {
      // console.log("gone down")
      fn_UpdateSocialProofData();
    });
    //   
    popbackup = setTimeout( function() {
      $(".custom-social-proof").stop().slideToggle('slow');
      // console.log("popped up")
    }, sp_timeout);
}

function fn_Percentage(para_percent) {
  if (Math.random() < para_percent/100) {
    return true;
  }
  return false;
}

function fn_RecentTimeGen() {
  if (fn_Percentage(80)) {
    return fn_PluralReturn(10,"hour","hours") + " ago";
  }
  return fn_PluralReturn(59,"min","mins") + " ago";
}

function fn_FutureTimeGen() {
  if (fn_Percentage(80)) {
   return fn_PluralReturn(6,"day","days") + " from now"; 
  }
  return fn_PluralReturn(1,"week","weeks") + " from now"; 
}

function fn_PastTimeGen() {
  if (fn_Percentage(80)) {
   return fn_PluralReturn(6,"day","days") + " ago";
  }
  return fn_PluralReturn(1,"week","weeks") + " ago";
}

function fn_PluralReturn(para_number,para_nonplural,para_plural) {
	var l_number = Math.ceil(Math.random() * para_number)
	if (l_number == 1) {
		return "" + l_number + " " + para_nonplural
	}
	return "" + l_number + " " + para_plural
}