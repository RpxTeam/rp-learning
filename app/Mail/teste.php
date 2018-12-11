<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class teste extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
        ->from('fehiya@gmail.com')
        ->subject('this is a test')
        ->view('emails.teste');
    }

    /**
      *Mail::to({email})->send(new {mail templete});
      *Mail::to('fehiya@gmail.com')->send(new teste());
      */
}
