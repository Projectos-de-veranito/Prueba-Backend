import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async addContact(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.addContact(createContactDto);
  }

  @Get(':user_id')
  async getContacts(@Param('user_id') user_id: string) {
    return this.contactsService.getContacts(user_id);
  }

  @Patch(':id')
  async updateContact(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.updateContact(id, updateContactDto);
  }

  @Delete(':id')
  async deleteContact(@Param('id') id: string) {
    return this.contactsService.deleteContact(id);
  }
}
