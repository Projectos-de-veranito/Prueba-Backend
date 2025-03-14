import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async addContact(
    @Body() body: { user_id: string; contact_id: string; status?: string },
  ) {
    return this.contactsService.addContact(body.user_id, body.contact_id, body.status);
  }

  @Get(':userId')
  async getContacts(@Param('userId') userId: string) {
    return this.contactsService.getContacts(userId);
  }
}
