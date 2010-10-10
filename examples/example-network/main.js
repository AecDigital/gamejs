var gamejs = require('gamejs');
var network = require('gamejs/network');
var client = require('gamejs/network/client');
var events = require('gamejs/network/events');

var font = new gamejs.font.Font();

var Game = function(eventHandler) {
   this.allGames = [];
   
   this.dispatch = function(event) {
      // once we are connected create a game
      if (event.type === events.CLIENT_CONNECTED) {
         gamejs.log('client connected');
      } else if (event.type === events.GAME_LIST_GAMES) {
         this.allGames = event.gameIds;
         gamejs.log('got game list ');
      }
   }
   
   this.update = function(msDuration) {
      gamejs.event.get().forEach(function(event) {
         if (event.type === gamejs.event.KEYUP) {
            console.log(event.key);
            if (event.key === gamejs.event.K_m) {
               gamejs.log('requesting game list');
               eventHandler.dispatch({
                  type: events.PLAYER_LIST_GAMES,
               });
            } else if (event.key === gamejs.event.K_c) {
               gamejs.log('creating game in game instance');
               eventHandler.dispatch({
                  type: events.PLAYER_CREATE_GAME,
               });
            } else if (gamejs.event.K_0 <= event.key && event.key <= gamejs.event.K_9) {
               gamejs.log('joining ');
               var newGameId = this.allGames[event.key - 48];
               eventHandler.dispatch({
                  type: events.PLAYER_JOIN,
                  gameId: newGameId,
               });
            } else if (gamejs.event.K_l == event.key) {
               eventHandler.dispatch({
                  type: events.PLAYER_LEAVE,
               });
            }

         }
      }, this);
   };
   
   eventHandler.register(this);
   return this;
};


function main() {
   var eventHandler = new network.EventHandler();
   var networkController = new client.NetworkController(
      'localhost:8080',
      'example-network', 
      eventHandler
   );
   var game = new Game(eventHandler);
      
   // init
   gamejs.display.setMode([800, 600]);
   gamejs.display.setCaption("Example Network");
   
   // game loop
   var mainSurface = gamejs.display.getSurface();
   var tick = function(msDuration) {
      game.update();
      mainSurface.fill("#FFFFFF");
      var text = 'Press m to query game list; c to create game; l to leave the game and approp number to join that game';
      mainSurface.blit(font.render(text));
      var y = 50;
      game.allGames.forEach(function(gid, idx) {
         mainSurface.blit(font.render(idx + ', #' + gid), [20, y + (idx*30)]);
      }, this);
   };
   gamejs.time.fpsCallback(tick, this, 30);

};

gamejs.ready(main);
