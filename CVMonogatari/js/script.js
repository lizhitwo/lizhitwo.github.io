// Define the messages used in the game.
var messages = {
	"Credits": {
		"Title": "Credits",
		"Subtitle": "LICENSE AND DISCLAIMER",
		"Message": "<p>Disclaimer: Names, characters, businesses, places, events and incidents are either the products of the author's imagination or used in a fictitious manner. Any resemblance to actual persons, living or dead, or actual events is purely coincidental.</p><p>Papermon - A Computer Vision Monogatari is released under the <a href='LICENSE'>MIT license</a>.</p><p>This software uses the Monogatari visual novel engine. <a href='https://github.com/Monogatari/Monogatari'>Monogatari</a> is a Free Open Source Software project released under the <a href='https://raw.githubusercontent.com/Monogatari/Monogatari/master/LICENSE'>MIT License</a>.</p>"
	}
}

// Define the notifications used in the game
var notifications = {
	"Welcome": {
		title: "Welcome",
		body: "This is the Monogatari VN Engine",
		icon: ""
	},
	"achieve_Init": {
		title: "Time Sink",
		body: "What's this? You have just found something you could procrastinate on instead of doing your research. Congratulations!"
	},
	"achieve_Amnesia": {
		title: "Anime Trope",
		body: "You have walked right into an anime trope. You should have believed what it says on the tin."
	},
	"achieve_B1_TE": {
		title: "Confusion End (ending 2/3)",
		body: "You have returned right where you started. Just like that research you were trying to do."
	},
	"achieve_B1_HP0": {
		title: "Bad End (ending 1/3)",
		body: "Maybe Papermon is not the right game for you.\nWhy not get back to work?"
	},
	"achieve_B1_GE": {
		title: "True End (ending 3/3)",
		body: "Everything that has a beginning (that drags you in), has an ending (that spits you right out)."
	},
	"help_allmoves": {
		title: "Breadth-first search",
		body: "Maybe not all puzzles in this world can be solved by enumeration."
	},
	
}

// Define the Particles JS Configurations used in the game
var particles = {

}

// Define the music used in the game.
var music = {

}

// Define the voice files used in the game.
var voice = {

}

// Define the sounds used in the game.
var sound = {

}

// Define the videos used in the game.
var videos = {

}

// Define the images used in the game.
var images = {
	"paper": "objects/paper.png",
	"player": "objects/player.png",
}

// Define the backgrounds for each scene.
var scenes = {
	"gameover_scene": "gameover.png"
}

// Define the Characters
var characters = {
	"sys": {
		"Name": "SYSTEM",
		"Color": "#aaaaaa",
	},
	"you": {
		"Name": ":::",
		"Color": "#ffffff",
	}
}

// for reduction
function add(a, b) {
    return a + b;
}

// make a jump-if command list
function make_jumpswitch( cond, targets ) {
	return [
		function() {
			var target = targets[eval(cond)];
			script["__jump_if__"] = [
				"jump " + target,
			];
		},
		"jump __jump_if__",
	];
}

// make "hurt yourself" procedure
function make_hurtself() {
	return [
		"$ storage.HP --",
		"hide player",
		"show player playerpos with shake1d",
		"sys You hurt yourself in confusion!",
	]
}

var enemy_moves = [ "B1_Attract", "B1_Pain Split", "B1_Spite", "B1_Flash", "B1_Synthesis", ];

var script = {
	"__jump_if__": [],
	// The game starts here.
	"Start": [
		"show player playerpos",
		"sys What is the player's name?",
		// "jump actual_start",
		"notify achieve_Init 10000",
		{"Input": {
				"Text": "What is the player's name?",
				"Validation": function(input) {
					return input.trim().length > 0;
				},
				"Save": function(input) {
					storage.player.Name = input;
					characters.you.Name = input;
					$_("[data-ui='say']").html('Hello '+input+'. Welcome to Papermon.');
				},
				"Warning": "You must enter a name!"
			}
		},
		// function () {
		// 	storage.player.Name = 'Aaa';
		// 	characters.you.Name = 'Aaa';
		// },
		"jump B1_Start",
	],
	"B1_Start": [
		"scene rgba(0,0,0,0)",
		"show paper enemypos with bounceInRight",
		"show player playerpos",
		function() {
			storage.HP = 4;
			storage.progress = -1;
			storage.flag_sleep = 0;
			storage.flag_attract = 0;
			storage.flag_foresight = 0;
			storage.flag_detect = 0;
			storage.help_allmoves_progress = [0,0,0,0];
		},
		"sys A wild preprint deep learning paper appears!",
		"jump B1_Attack",
	],
	"B1_Attack": [
		{"Choice": {
				"Dialog": "sys What will {{player.Name}} do?",
				"B1_Splash": {
					"Text": "Splash",
					"Do": "jump B1_Splash"
				},
				"B1_Foresight": {
					"Text": "Foresight",
					"Do": "jump B1_Foresight",
				},
				"B1_Rest": {
					"Text": "Rest",
					"Do": "jump B1_Rest",
				},
				"B1_Detect": {
					"Text": "Detect",
					"Do": "jump B1_Detect_0",
					"Condition": function() {return storage.flag_detect==0},
				},
				"B1_Amnesia": {
					"Text": "Amnesia",
					"Do": "jump B1_Amnesia",
					"Condition": function() {return storage.flag_detect!=0 && storage.flag_attract!=0},
				},
				"B1_Perish": {
					"Text": "Perish Song",
					"Do": "jump B1_Perish",
					"Condition": function() {return storage.flag_detect!=0 && storage.flag_attract==0},
				},
			}
		}
	],
	"B1_Splash": [
		"sys {{player.Name}} uses the water cup.",
		"hide paper",
		"show paper enemypos with swing",
		"sys The paper becomes soggy.",
		"$ storage.help_allmoves_progress[0] = 1",
		"jump B1_defense",
	],
	"B1_Rest": [
		"sys Instead of reading the paper, you decide to nap for a while.",
		"hide player",
		"show player playerpos with flash",
		"you Zzz...",
		"$ storage.flag_sleep = 1",
		"$ storage.help_allmoves_progress[1] = 1",
		"jump B1_defense",
	],
	"B1_Foresight": [
		"hide player",
		"show player playerpos with flash",
		"sys You try to sense, within the ether, the quality of the paper in front of you.",
		"sys The ether does not have an explanation to why this paper was able to pass peer review.",
		"sys Realizing this, you become more cautious. Your accuracy has risen!",
		"$ storage.flag_foresight = 1",
		"$ storage.help_allmoves_progress[2] = 1",
		"jump B1_defense",
	],
	"B1_Detect_0": [
		"hide player",
		"show player playerpos with pulse",
		"sys You try to figure out the significance of the paper.",
		"$ storage.help_allmoves_progress[3] = 1",
	].concat(make_jumpswitch("storage.flag_foresight", ["B1_Detect_1", "B1_Detect_2"])),
	"B1_Detect_1": [
		"sys You read the motivation section.",
		"sys The paper uses exquisite words to describe the simplest common sense in your field.",
		"sys The paper further goes on to make claims about originality and assumptions with jargon that you have never heard of.",
		"sys As you read on, you become irrationally infatuated by the grandeur of the paper.",
	].concat(make_hurtself(), ["jump B1_defense"]),
	"B1_Detect_2": [
		"sys You read the experiment section.",
	].concat(make_jumpswitch("Math.floor( Math.random() * 10 )", ["B1_Detect_21", "B1_Detect_22", "B1_Detect_23", "B1_Detect_24", "B1_Detect_25", "B1_Detect_26", "B1_Detect_27", "B1_Detect_28", "B1_Detect_29", "B1_Detect_20"])),

	"B1_Detect_21": [
		"sys The paper, motivated on deformable parts, conducts experiments only on original MNIST.",
		"jump B1_Detect_3",		
	],
	"B1_Detect_22": [
		"sys The paper, motivated on colorization without mode collapse, conducts experiments only on original MNIST.",
		"jump B1_Detect_3",		
	],
	"B1_Detect_23": [
		"sys The paper, motivated on being robust to sensor noise, conducts experiments only on original MNIST.",
		"jump B1_Detect_3",		
	],
	"B1_Detect_24": [
		"sys The paper, motivated on multitask learning, conducts experiments only on MNIST split in two subsets.",
		"jump B1_Detect_3",		
	],
	"B1_Detect_25": [
		"sys The paper, motivated on fast and efficient detection, conducts experiments only on translated MNIST.",
		"jump B1_Detect_3",		
	],
	"B1_Detect_26": [
		"sys The paper, motivated on multimodal texture synthesis, conducts experiments on MNIST colorized into red, green, or blue.",
		"jump B1_Detect_3",		
	],
	"B1_Detect_27": [
		"sys The paper, motivated on attribute disentanglement, conducts experiments on MNIST with 'even_or_odd' as the only attribute.",
		"jump B1_Detect_3",		
	],
	"B1_Detect_28": [
		"sys The paper, motivated on unsupervised clustering, conducts experiments on the union of MNIST and color-inverted MNIST.",
		"jump B1_Detect_3",		
	],
	"B1_Detect_29": [
		"sys The paper, motivated on life-long learning, conducts experiments only on MNIST, adding each digit as a separate new task.",
		"jump B1_Detect_3",		
	],
	"B1_Detect_20": [
		"sys The paper, motivated on visual question answering, conducts experiments on MNIST with generated questions like 'is this a number' and 'what color is the number'.",
		"jump B1_Detect_3",		
	],
	"B1_Detect_3": [
		"sys As you read on, you realize that...",
	].concat(make_jumpswitch("Math.floor( Math.random() * 5 )", ["B1_Detect_31", "B1_Detect_32", "B1_Detect_33", "B1_Detect_34", "B1_Detect_35"])),
	"B1_Detect_31": [
		"sys ... that the only external comparison is a network from the 1980's.",
		"jump B1_Detect_4",		
	],
	"B1_Detect_32": [
		"sys ... that the only external comparison is a natural neural network on a rodent.",
		"jump B1_Detect_4",		
	],
	"B1_Detect_33": [
		"sys ... that the only external comparison is a 1-hidden-layer MLP, citing the universal approximation theorem.",
		"jump B1_Detect_4",		
	],
	"B1_Detect_34": [
		"sys ... that the only external comparison is pre-trained on Iris, while theirs is on Tiny ImageNet.",
		"jump B1_Detect_4",		
	],
	"B1_Detect_35": [
		"sys ... that the only external comparison has a performance worse than chance.",
		"jump B1_Detect_4",		
	],
	"B1_Detect_4": [
		"hide player",
		"show player playerpos with flash",
		"sys A sudden realization dawns upon you that you have wasted your precious time reading a paper that is not beneficial to your research, personal development, or mental health.",
		"sys But as you are contemplating about trashing the paper, it lurches forward!",
		"$ storage.flag_detect = 1",
		"jump B1_defense",
	],

	// Bad Ending
	"B1_Amnesia": [
		"notify achieve_Amnesia 10000",
		"sys Your conflicting beliefs in the paper have caused dissonance in your mind.",
		"hide player",
		"show player playerpos with shake1d",
		"sys You bump yourself in the head repeatedly, until you have forgotten everything you have read about this paper.",
		"scene rgb(255,255,255) with fadeIn",
		"show paper enemypos",
		"show player playerpos",
		"hide player with fadeOut",
		"hide paper with fadeOut",
		"sys And with a flash, it is all gone.",
		"scene rgb(255,255,255) with fadeOut",
		"show player playerpos with fadeIn",
		"sys When you come to, everything is the same as before.",
		"notify achieve_B1_TE 10000",
		"jump B1_Start",
	],
	
	// Good Ending
	"B1_Perish": [
		"hide player",
		"show player playerpos",
		"hide player with fadeOut",
		"sys Screaming, you run away from the paper, determined not to ever read it again.",
		"scene rgb(255,255,255) with fadeIn",
		"show paper enemypos",
		"hide paper with fadeOut",
		"notify achieve_B1_GE 10000",
		"sys THE END",
		{"Choice": {
				"Dialog": "Play again?",
				"Yes": {
					"Text": "Yes",
					"Do": "jump B1_Start"
				},
				"No": {
					"Text": "No",
					"Do": "jump __Blackhole__",
				},
			}
		},
	],
	
	"B1_defense": make_jumpswitch("storage.help_allmoves_progress.reduce(add, 0) == 4 && !(storage.flag_detect!=0 && storage.flag_attract==0)", {true: "B1_help_allmoves_notification", false: "B1_defense_1"}),
	"B1_help_allmoves_notification": [
		"notify help_allmoves 10000",
		"jump B1_defense_1",
	],
	"B1_defense_1": [
		"$ storage.progress = Math.max(Math.min(storage.progress+1, 4), 0)",
		"$ storage.__temp__ = enemy_moves[storage.progress].replace('B1_','')",
		"sys The paper uses {{__temp__}}!"
	].concat(make_jumpswitch("storage.flag_sleep==1", {true: "B1_defense_success", false: "B1_defense_fail"})),

	"B1_defense_success": [
		"sys But it fails!",
		"$ storage.flag_sleep = 0",
		"sys {{player.Name}} wakes up!",
		"jump B1_HPcond",
	],
	"B1_defense_fail": make_jumpswitch("storage.progress", enemy_moves),

	"B1_Attract": [
		"hide paper",
		"show paper enemypos with tada",
		"sys The paper displays its impressive author list and their affiliations.",
		"sys A strong sense of dread crawls over you as you realize that no matter what is in the paper, you would HAVE to read it anyway.",
		"$ storage.flag_attract = 1",
		"sys You cannot escape now!",
		"jump B1_HPcond",
	],

	"B1_Pain": [
		"sys The paper tries to explain a key counter-intuitive implementation detail.",
		"hide paper",
		"show paper enemypos with jello",
		"sys But it simply reiterates its method procedure!",
		"sys Now you are confused as much as they are by their method.",
		"jump B1_ConfuseHurt",
	],

	"B1_Spite": [
		"hide paper",
		"show paper enemypos with bounce",
		"sys The paper introduces hyperparameters without specifying how they are obtained.",
		"jump B1_ConfuseHurt",
	],

	"B1_Flash": [
		"hide paper",
		"show paper enemypos with flash",
		"sys The paper flashes you some figures, but fails to explain what the x axis is.",
		"jump B1_ConfuseHurt",
	],

	"B1_Synthesis": [
		"hide paper",
		"show paper enemypos with wobble",
		"sys The paper shows an entire page of cherry-picked image generation result.",
		"sys You cannot determine whether their method works or not!",
		"jump B1_ConfuseHurt",
	],

/*
var enemy_moves = [ "B1_Attract", "B1_Pain Split", "B1_Spite", "B1_Flash", "B1_Synthesis", ];
pain split
	The paper tries to explain a key counter-intuitive implementation detail.
	But it simply reiterates its method!
	Now you are confused as much as they are by their method!
spite
	The paper introduces hyperparameter without specifying how they are obtained.
flash
	The paper flashes you some figures, but fail to explain what the x axis is.
	You are confused and hit yourself in the face!
synthesis
	The paper shows an entire page of cherry-picked generated images.
	You cannot decide whether their method works or not!
	You hurt yourself in confusion.
*/

	"B1_ConfuseHurt": make_hurtself().concat([
		"jump B1_HPcond",
	]),
	
	"B1_HPcond": make_jumpswitch("storage.HP > 0", {true: "B1_Attack", false: "B1_HP0"}),
	"B1_HP0": [
		"hide player",
		"show player playerpos",
		"hide player with hinge",
		"sys {{player.Name}} has fainted!",
		"scene rgb(0,0,0) with fadeIn",
		"show paper enemypos",
		"hide paper with fadeOut",
		// "sys {{player.Name}} has fainted!",
		"notify achieve_B1_HP0 10000",
		{"Choice": {
				"Dialog": "THE END<br/><br/>Play again?",
				"Yes": {
					"Text": "Yes",
					"Do": "jump B1_Start"
				},
				"No": {
					"Text": "No",
					"Do": "jump __Blackhole__",
				},
			}
		},
	],

	"__Blackhole__": [
		"display message Credits",
	],


	// "hack": make_jumpswitch("storage.player.Name=='asdf'", {true: 'Intro', false: 'Results'}),

	// "Intro": [
	// 	"sys The paper has something intelligible as the motivation.",
	// 	"sys As {{player.Name}} reads on, the intro section includes 2 words {{player.Name}} has never seen before in every sentence, and three equations right off the third paragraph.",
	// 	"sys Try as you might, drowsiness begins to gradually take over.",
	// 	"scene gameover_scene with shake2d",
	// 	"sys {{player.Name}} fainated!",
	// 	// "end"
	// 	"jump actual_start"
	// ],

	// "Results": [

	// 	"sys You flip for the results section.",
	// 	"sys After 3 minutes of skimming, you realize that this paper, although experiment-driven, does not have a results section.",
	// 	"sys You successfully avoided wasting time on this paper.",
	// 	// "end"
	// 	"jump actual_start"
	// ]
}

/*
splash
	the paper becomes soggy.
rest
	Instead of reading the paper, you decide to nap for a while.
	Zzz...
	When you wake up, you ask the paper what it does about occlusion.
	The paper is confused and hits itself!
foresight
	You sense, within the ether, the quality of the paper before you eyes.
	The ether does not have an explanation to why this paper passed peer review.
	Realizing this, you became more cautious. Your accuracy has risen!
detect
	You try to figure out the significance of the paper.
	1) You read the motivation section. 
	The paper uses exquisite words to describe the simplest common sense in your field.
	Then the paper goes on to make claims about originality and assumptions with jargon that you do not understand.
	As you read on, you become irrationally infatuated by the grandeur of the paper.
	And then the paper introduces 10 equations in the motivation section!
	You hurt yourself in confusion.
	2) You read the experiment section.
	The paper, motivated on deformable parts, conducts experiments only on original MNIST.
	The paper, motivated on colorization without mode collapse, conducts experiments only on original MNIST.
	The paper, motivated on being robust to sensor noise, conducts experiments only on original MNIST.
	The paper, motivated on multitask learning, conducts experiments only on MNIST split in two subsets.
	The paper, motivated on fast and efficient detection, conducts experiments only on translated MNIST.
	As you read on, the baseline they compare their network to is from 20 years ago.
	A sudden realization dawns upon you that you have wasted your precious time reading a paper that is not beneficial to your research, personal development, or mental health.
perish song
	Screaming, you run away from the paper, determined not to ever read it again.
amnesia
	Your beliefs in the paper has caused dissonance in your mind.
	You bump yourself in the head repeatedly, until you forget you have read anything about this paper.
	And in a flash, it is all gone.

attract
	The paper shows its impressive author list and their affiliations.
	A strong sense of dread crawls over you as you realize that no matter what is in the paper, you have to read it anyway.
	You cannot escape now!
return
flash
	The paper flashes you some figures, but fail to explain what the x axis is.
	You are confused and hit yourself in the face!
mind reader
	? The paper anticipates your question and 
protect
synthesis
	The paper shows an entire page of cherry-picked generated images.
	You cannot decide whether their method works or not!
	You hurt yourself in confusion.
pain split
	The paper tries to explain a key counter-intuitive implementation detail.
	But it simply reiterates its method!
	Now you are confused as much as they are by their method!
spite
	The paper introduces hyperparameter without specifying how they are obtained.
*/