import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { MessagesModule } from './modules/messages/messages.module';
import { NotificationsModule } from './modules/notifications/notifications.module';


@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [SupabaseModule, AuthModule, UsersModule, ContactsModule, MessagesModule, NotificationsModule],
})
export class AppModule {}

