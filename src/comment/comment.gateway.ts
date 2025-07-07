import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class CommentGateway {
  @WebSocketServer()
  server: Server;

  emitNewComment(comment: any) {
    console.log('Emitting new comment:', comment);
    this.server.emit('new_comment', comment);
  }
}
