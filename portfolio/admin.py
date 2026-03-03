from django.contrib import admin
from django.utils.html import format_html
from .models import Project, Certificate, ContactMessage


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display  = ['emoji', 'title', 'tech_stack', 'order']
    list_editable = ['order']
    search_fields = ['title', 'description']
    fieldsets = (
        ('Basic Info', {'fields': ('emoji', 'title', 'description', 'order')}),
        ('Details',    {'fields': ('problem', 'solution', 'features', 'learnings')}),
        ('Tech Stack', {'fields': ('tech_stack',)}),
        ('Links',      {'fields': ('live_link', 'github_link')}),
    )


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display  = ['title', 'issuer', 'issued_date', 'has_file', 'has_image', 'order']
    list_editable = ['order']
    search_fields = ['title', 'issuer']

    def has_file(self, obj):
        return '✅' if obj.certificate_file else '❌'
    has_file.short_description = 'PDF'

    def has_image(self, obj):
        if obj.certificate_image:
            return format_html('<img src="{}" height="40" style="border-radius:4px"/>', obj.certificate_image.url)
        return '—'
    has_image.short_description = 'Preview'


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display  = ['name', 'email', 'subject', 'created_at', 'is_read']
    list_editable = ['is_read']
    list_filter   = ['is_read']
    readonly_fields = ['name', 'email', 'subject', 'message', 'created_at']
