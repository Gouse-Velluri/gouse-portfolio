from django.db import models


class Project(models.Model):
    title        = models.CharField(max_length=200)
    description  = models.TextField()
    problem      = models.TextField(blank=True)
    solution     = models.TextField(blank=True)
    features     = models.TextField(blank=True, help_text="One feature per line")
    tech_stack   = models.CharField(max_length=300, help_text="Comma-separated: Django, MySQL, React")
    learnings    = models.TextField(blank=True, help_text="One learning per line")
    github_link  = models.URLField(blank=True, null=True)
    live_link    = models.URLField(blank=True, null=True)
    emoji        = models.CharField(max_length=10, default='🚀')
    order        = models.PositiveIntegerField(default=0)
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title

    def tech_list(self):
        return [t.strip() for t in self.tech_stack.split(',') if t.strip()]

    def feature_list(self):
        return [f.strip() for f in self.features.splitlines() if f.strip()]

    def learning_list(self):
        return [l.strip() for l in self.learnings.splitlines() if l.strip()]


class Certificate(models.Model):
    title        = models.CharField(max_length=200)
    issuer       = models.CharField(max_length=200)
    issued_date  = models.CharField(max_length=50, blank=True, help_text="e.g. 2024")
    certificate_file = models.FileField(
        upload_to='certificates/',
        blank=True, null=True,
        help_text="Upload PDF or image of certificate"
    )
    certificate_image = models.ImageField(
        upload_to='cert_images/',
        blank=True, null=True,
        help_text="Upload certificate preview image"
    )
    credential_url = models.URLField(blank=True, null=True, help_text="Online credential verification link")
    color        = models.CharField(max_length=20, default='purple', help_text="purple / indigo / green / orange")
    order        = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.title} — {self.issuer}"


class ContactMessage(models.Model):
    name       = models.CharField(max_length=100)
    email      = models.EmailField()
    subject    = models.CharField(max_length=200, blank=True)
    message    = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read    = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} — {self.subject or 'No subject'}"
