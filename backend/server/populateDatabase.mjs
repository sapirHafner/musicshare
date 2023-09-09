import Artist from './models/Artist.mjs';
import User from './models/User.mjs'
import Likes from './models/Likes.mjs'
import Album from './models/Album.mjs';
import Song from './models/Song.mjs'
import Followers from './models/Followers.mjs'
import FeatureFlag from './models/FeatureFlag.mjs'
import mongoose from 'mongoose';
import Post from './models/Post.mjs';

export const populateDatabase = async () => {
   try {
    await ((new FeatureFlag({name: "images", active:"true"})).save())
    const artistsUsers = [
        {
            _id: new mongoose.Types.ObjectId(),
            type: "artist",
            username: "thisisadele",
            password: 123456
        },
        {
            _id: new mongoose.Types.ObjectId(),
            type: "artist",
            username: "edsheeranofficial",
            password: 654321
        },
        {
            _id: new mongoose.Types.ObjectId(),
            type: "artist",
            username: "beyonceknowles",
            password: 987654
        },
        {
            _id: new mongoose.Types.ObjectId(),
            type: "artist",
            username: "taylorswift13",
            password: 111222
        },
        {
            _id: new mongoose.Types.ObjectId(),
            type: "artist",
            username: "kendricklamar",
            password: 333444
        },
        {
            _id: new mongoose.Types.ObjectId(),
            type: "artist",
            username: "badgalriri",
            password: 555666
        },
        {
            _id: new mongoose.Types.ObjectId(),
            type: "artist",
            username: "billieeilish",
            password: 777888
        },
        {
            _id: new mongoose.Types.ObjectId(),
            type: "artist",
            username: "champagnepapi",
            password: 999000
        },
    ];

    const artists = [{
        name: 'Adele',
        email: 'adele@example.com',
        albumsIds: [], // Initialize with an empty array
        imageUrl: 'https://images.hellomagazine.com/horizon/landscape/eef65bf16456-adele-t.jpg?tx=c_fill,w_1280',
      },
      {
        name: 'Ed Sheeran',
        email: 'ed@example.com',
        albumsIds: [], // Initialize with an empty array
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Ed_Sheeran-6886_%28cropped%29.jpg/440px-Ed_Sheeran-6886_%28cropped%29.jpg',
      },
        {
        name: 'Beyoncé',
        email: 'beyonce@example.com',
        albumsIds: [], // Initialize with an empty array
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Beyonc%C3%A9_-_Tottenham_Hotspur_Stadium_-_1st_June_2023_%2871_of_118%29_%2852945301662%29_%28face_cropped%29.jpg/440px-Beyonc%C3%A9_-_Tottenham_Hotspur_Stadium_-_1st_June_2023_%2871_of_118%29_%2852945301662%29_%28face_cropped%29.jpg',
      },
    {
        name: 'Taylor Swift',
        email: 'taylor@example.com',
        albumsIds: [], // Initialize with an empty array
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png/440px-191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png',
      },
        {
        name: 'Kendrick Lamar',
        email: 'kendrick@example.com',
        albumsIds: [], // Initialize with an empty array
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Pulitzer2018-portraits-kendrick-lamar.jpg/440px-Pulitzer2018-portraits-kendrick-lamar.jpg',
      },
      {
        name: 'Rihanna',
        email: 'rihanna@example.com',
        albumsIds: [], // Initialize with an empty array
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Rihanna_Fenty_2018.png/440px-Rihanna_Fenty_2018.png',
      },
      {
        name: 'Billie Eilish',
        email: 'billie@example.com',
        albumsIds: [], // Initialize with an empty array
        imageUrl: 'https://media.allure.com/photos/605247e1bddfa641546fa160/16:9/w_2240,c_limit/billie%20eilish.jpg',
      },
      {
        name: 'Drake',
        email: 'drake@example.com',
        albumsIds: [], // Initialize with an empty array
        imageUrl: 'https://media1.popsugar-assets.com/files/thumbor/WzoHIkBF3Rs60VYPFr2urGemAwU/0x224:2826x3050/fit-in/500x500/filters:format_auto-!!-:strip_icc-!!-/2020/02/11/894/n/1922398/87f6bb525e430e7bd44e40.22278576_/i/Drake.jpg',
      }]

      const albums = [
        // Adele's Albums
        [
            {
                artistId: null, // You'll set this later
                name: '19',
                songsIds: [], // Initialize with an empty array
                imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f8/Adele_-_19.png',
            },
            {
                artistId: null,
                name: '21',
                songsIds: [], // Initialize with an empty array
                imageUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1b/Adele_-_21.png',
            },
            {
                artistId: null,
                name: '25',
                songsIds: [], // Initialize with an empty array
                imageUrl: 'https://upload.wikimedia.org/wikipedia/en/9/96/Adele_-_25_%28Official_Album_Cover%29.png',
            },
        ],
    
        // Ed Sheeran's Albums
        [
            {
                artistId: null, // You'll set this later
                name: '÷ (Divide)',
                songsIds: [], // Initialize with an empty array
                imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png',
            },
            {
                artistId: null,
                name: 'x',
                songsIds: [], // Initialize with an empty array
                imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/ad/X_cover.png',
            },
            {
                artistId: null,
                name: '+',
                songsIds: [], // Initialize with an empty array
                imageUrl: 'https://upload.wikimedia.org/wikipedia/en/3/3f/Ed_Sheeran_%2B_cover.png',
            },
        ],

        // Beyoncé's Albums
        [
            {
                artistId: null, // You'll set this later
                name: 'Lemonade',
                songsIds: [], // Initialize with an empty array
                imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/53/Beyonce_-_Lemonade_%28Official_Album_Cover%29.png',
            },
            {
                artistId: null,
                name: 'Beyoncé',
                songsIds: [], // Initialize with an empty array
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Beyonc%C3%A9_-_Beyonc%C3%A9.svg/440px-Beyonc%C3%A9_-_Beyonc%C3%A9.svg.png',
            },
        ],
    
        // Taylor Swift's Albums
        [
            {
                artistId: null, // You'll set this later
                name: '1989',
                songsIds: [], // Initialize with an empty array
                imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png',
            },
            {
                artistId: null,
                name: 'Fearless',
                songsIds: [], // Initialize with an empty array
                imageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/86/Taylor_Swift_-_Fearless.png',
            },
        ],
    
        // Kendrick Lamar's Albums
        [
            {
                artistId: null, // You'll set this later
                name: 'DAMN.',
                songsIds: [], // Initialize with an empty array
                imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png',
            },
            {
                artistId: null,
                name: 'To Pimp a Butterfly',
                songsIds: [], // Initialize with an empty array
                imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png',
            },
        ],
    
        // Rihanna's Albums
        [
            {
                artistId: null, // You'll set this later
                name: 'Anti',
                songsIds: [], // Initialize with an empty array
                imageUrl: 'https://upload.wikimedia.org/wikipedia/en/3/32/Rihanna_-_Anti.png',
            },
            {
                artistId: null,
                name: 'Good Girl Gone Bad',
                songsIds: [], // Initialize with an empty array
                imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f7/Good_Girl_Gone_Bad.png',
            },
        ],
    
        // Billie Eilish's Albums
        [
            {
                artistId: null, // You'll set this later
                name: 'When We All Fall Asleep, Where Do We Go?',
                songsIds: [], // Initialize with an empty array
                imageUrl: 'https://upload.wikimedia.org/wikipedia/en/3/38/When_We_All_Fall_Asleep%2C_Where_Do_We_Go%3F.png',
            },
            {
                artistId: null,
                name: 'Happier Than Ever',
                songsIds: [], // Initialize with an empty array
                imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/45/Billie_Eilish_-_Happier_Than_Ever.png',
            },
        ],
    
        // Drake's Albums
        [
            {
                artistId: null, // You'll set this later
                name: 'Scorpion',
                songsIds: [], // Initialize with an empty array
                imageUrl: 'https://upload.wikimedia.org/wikipedia/en/9/90/Scorpion_by_Drake.jpg',
            },
            {
                artistId: null, // You'll set this later
                name: 'Certified Lover Boy',
                songsIds: [], // Initialize with an empty array
                imageUrl: 'https://upload.wikimedia.org/wikipedia/en/7/79/Drake_-_Certified_Lover_Boy.png?20210830153038',
            },
            {
                artistId: null,
                name: 'Views',
                songsIds: [], // Initialize with an empty array
                imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/af/Drake_-_Views_cover.jpg',
            },
        ],
    ];

    const songs = {
        "Certified Lover Boy": [	"Champagne Poetry", 	"Fair Trade"],
        "19": ["Hometown Glory", "Chasing Pavements", "Cold Shoulder", /* Add more songs for '19' */],
        "21": ["Rolling in the Deep", "Rumour Has It", "Turning Tables", /* Add more songs for '21' */],
        "25": ["Hello", "Send My Love (To Your New Lover)", "Water Under the Bridge", /* Add more songs for '25' */],
        "÷ (Divide)": ["Shape of You", "Castle on the Hill", "Galway Girl", /* Add more songs for '÷ (Divide)' */],
        "x": ["Sing", "Don't", "Photograph", /* Add more songs for 'x' */],
        "+": ["The A Team", "Lego House", "Drunk", /* Add more songs for '+' */],
        "Lemonade": ["Pray You Catch Me", "Hold Up", "Don't Hurt Yourself", /* Add more songs for 'Lemonade' */],
        "Beyoncé": ["Pretty Hurts", "Haunted", "Drunk in Love", /* Add more songs for 'Beyoncé' */],
        "I Am... Sasha Fierce": ["If I Were a Boy", "Single Ladies (Put a Ring on It)", "Halo", /* Add more songs for 'I Am... Sasha Fierce' */],
        "4": ["1+1", "Best Thing I Never Had", "Love on Top", /* Add more songs for '4' */],
        "Dangerously In Love": ["Crazy in Love", "Naughty Girl", "Baby Boy", /* Add more songs for 'Dangerously In Love' */],
        "1989": ["Welcome to New York", "Blank Space", "Style", /* Add more songs for '1989' */],
        "Fearless": ["Fearless", "Love Story", "You Belong with Me", /* Add more songs for 'Fearless' */],
        "Red": ["Red", "I Knew You Were Trouble", "We Are Never Ever Getting Back Together", /* Add more songs for 'Red' */],
        "Speak Now": ["Mine", "Back to December", "Mean", /* Add more songs for 'Speak Now' */],
        "Reputation": ["...Ready for It?", "End Game", "Delicate", /* Add more songs for 'Reputation' */],
        "Lover": ["I Forgot That You Existed", "Cruel Summer", "Lover", /* Add more songs for 'Lover' */],
        "Folklore": ["The 1", "Cardigan", "The Last Great American Dynasty", /* Add more songs for 'Folklore' */],
        "Evermore": ["Willow", "Champagne Problems", "Gold Rush", /* Add more songs for 'Evermore' */],
        "DAMN.": ["BLOOD.", "DNA.", "LOYALTY.", /* Add more songs for 'DAMN.' */],
        "To Pimp a Butterfly": ["Wesley's Theory", "For Free? (Interlude)", "King Kunta", /* Add more songs for 'To Pimp a Butterfly' */],
        "Anti": ["Consideration", "Kiss It Better", "Work", /* Add more songs for 'Anti' */],
        "Good Girl Gone Bad": ["Umbrella", "Don't Stop the Music", "Shut Up and Drive", /* Add more songs for 'Good Girl Gone Bad' */],
        "When We All Fall Asleep, Where Do We Go?": ["!!!!!!!", "Bad Guy", "Xanny", /* Add more songs for 'When We All Fall Asleep, Where Do We Go?' */],
        "Happier Than Ever": ["Getting Older", "I Didn’t Change My Number", "Billie Bossa Nova", /* Add more songs for 'Happier Than Ever' */],
        "Scorpion": ["Survival", "Nonstop", "God's Plan", /* Add more songs for 'Scorpion' */],
        "Views": ["Keep the Family Close", "9", "U With Me?", /* Add more songs for 'Views' */],
    };

    const artistsIds = {}
    const albumsIds = {}
    const songsIds = {}
    const usersIds = {}

    await Promise.all(artists.map(async (artist, index) => {
        const artistUser = artistsUsers[index];
        const artistDoc = new Artist({...artist, userId: artistUser._id});
        const user = new User(artistUser);
        const likes = new Likes({
            musicalEntity: {
                type: "artist",
                id: artistDoc._id
              },
              usersIds: []
        })
        const followersDoc = new Followers({
            artistId: artistDoc._id,
            followers: []
        })
        await likes.save()
        await followersDoc.save()
        await user.save();
        usersIds[artist.name] = user._id

        const artistAlbums = albums[index];
        await Promise.all(artistAlbums.map(async (album) => {
            const createdAlbum = new Album({...album, artistId: artistDoc._id});
            const albumLikes = new Likes({
                musicalEntity: {
                    type: "album",
                    id: createdAlbum._id
                  },
                  usersIds: []
            })
            await albumLikes.save()
            const albumSongs = songs[album.name];
            Promise.all(albumSongs.map(async song => {
                const createdSong = new Song({name: song, albumId: createdAlbum._id})
                const songLikes = new Likes({
                    musicalEntity: {
                        type: "song",
                        id: createdSong._id
                      },
                      usersIds: []
                })

                await createdSong.save();
                songsIds[song] = createdSong._id;
                await songLikes.save();
                createdAlbum.songsIds.push(createdSong._id)
            }))
            await createdAlbum.save();
            albumsIds[album.name] = createdAlbum._id
            artistDoc.albumsIds.push(createdAlbum._id)
       }))
       await artistDoc.save();
       artistsIds[artistDoc.name] = artistDoc._id;
    }))

    const posts = [

    {
        musicalEntity: {
            type: "album",
            id: albumsIds['Lemonade'] // Assuming you have Beyoncé's "Lemonade" album ID
        },
        userId: usersIds['Ed Sheeran'],
        title: "A Sweet Surprise",
        content: "Just discovered @Beyoncé's 'Lemonade' album, and it's a sweet surprise. 🍋🎶 Any 'Lemonade' fans here? What's your favorite track? #Beyoncé #Lemonade",
        createdAt: new Date(),
    },
    {
        musicalEntity: {
            type: "album",
            id: albumsIds['To Pimp a Butterfly'] // Assuming you have Kendrick Lamar's "To Pimp a Butterfly" album ID
        },
        userId: usersIds['Rihanna'],
        title: "Timeless Masterpiece",
        content: "Listening to @Kendrick Lamar's 'To Pimp a Butterfly.' This album is a timeless masterpiece. Which track resonates with you the most? #KendrickLamar #ToPimpAButterfly",
        createdAt: new Date(),
    },
    {
        musicalEntity: {
            type: "album",
            id: albumsIds['Views'] // Assuming you have Drake's "Views" album ID
        },
        userId: usersIds['Taylor Swift'],
        title: "Throwback Vibes",
        content: "Throwing it back with @Drake's 'Views' album. It never gets old. What's your favorite track from this classic? #Drake #Views",
        createdAt: new Date(),
    },
    // ... Add more mixed posts between artists and albums

    {
        musicalEntity: {
            type: "album",
            id: albumsIds['x'] // Assuming you have Ed Sheeran's "x" album ID
        },
        userId: usersIds['Billie Eilish'],
        title: "Ed's Magical Melodies",
        content: "Getting lost in @Ed Sheeran's magical melodies from the 'x' album. Which Ed Sheeran song is your all-time favorite? 🎶 #EdSheeran #x",
        createdAt: new Date(),
    },
    {
        musicalEntity: {
            type: "album",
            id: albumsIds['Good Girl Gone Bad'] // Assuming you have Rihanna's "Good Girl Gone Bad" album ID
        },
        userId: usersIds['Kendrick Lamar'],
        title: "Rihanna's Iconic Era",
        content: "Throwing it back to Rihanna's iconic era with 'Good Girl Gone Bad.' What's your go-to track from this album? #Rihanna #GoodGirlGoneBad",
        createdAt: new Date(),
    },
    {
        musicalEntity: {
            type: "song",
            id: songsIds['Chasing Pavements'] // Assuming you have Adele's song ID for "Chasing Pavements"
        },
        userId: usersIds['Ed Sheeran'],
        title: "Adele's Timeless Hit",
        content: "Listening to Adele's timeless hit 'Chasing Pavements' from the '19' album. What's your favorite Adele song? 🎶 #Adele #ChasingPavements",
        createdAt: new Date(),
    },
    {
        musicalEntity: {
            type: "song",
            id: songsIds['Love Story'] // Assuming you have Taylor Swift's song ID for "Love Story"
        },
        userId: usersIds['Rihanna'],
        title: "Taylor's Romantic Ballad",
        content: "Can't resist the charm of Taylor Swift's romantic ballad 'Love Story.' Which Taylor Swift song is your guilty pleasure? ❤️ #TaylorSwift #LoveStory",
        createdAt: new Date(),
    },
    {
        musicalEntity: {
            type: "song",
            id: songsIds['Bad Guy'] // Assuming you have Billie Eilish's song ID for "Bad Guy"
        },
        userId: usersIds['Kendrick Lamar'],
        title: "Billie's Catchy Tune",
        content: "Billie Eilish's 'Bad Guy' is the ultimate catchy tune. Do you have it on your playlist too? 🎵 #BillieEilish #BadGuy",
        createdAt: new Date(),
    },
    // ... Add more mixed posts about songs

    {
        musicalEntity: {
            type: "song",
            id: songsIds['Don\'t Stop the Music'] // Assuming you have Rihanna's song ID for "Don't Stop the Music"
        },
        userId: usersIds['Billie Eilish'],
        title: "Rihanna's Dance Anthem",
        content: "Dancing the night away to Rihanna's dance anthem 'Don't Stop the Music.' Who else loves this track? 💃🎶 #Rihanna #DanceMusic",
        createdAt: new Date(),
    },
    {
        musicalEntity: {
            type: "song",
            id: songsIds['Sing'] // Assuming you have Ed Sheeran's song ID for "Sing"
        },
        userId: usersIds['Taylor Swift'],
        title: "Ed's Energetic Jam",
        content: "Getting energized with Ed Sheeran's upbeat jam 'Sing.' What's your favorite song to dance to? 💃🕺 #EdSheeran #Sing",
        createdAt: new Date(),
    },
        {
            musicalEntity: {
              type: "artist",
              id: artistsIds['Beyoncé'] // Assuming you have Beyoncé's artist ID
            },
            userId: usersIds['Beyoncé'], // Assuming you have Beyoncé's user ID
            title: "Hello from Beyoncé!",
            content: "Thank you all for the incredible support on my latest album. Your love and appreciation mean the world to me. Let's keep making beautiful music together! 💙🎶 #Beyoncé #MusicLove",
            createdAt: new Date(),
          },
          {
            musicalEntity: {
              type: "song",
              id: songsIds["Crazy in Love"] // Assuming you have Beyoncé's song ID
            },
            userId: usersIds['Beyoncé'], // Assuming you have Beyoncé's user ID
            title: "Crazy in Love",
            content: "Celebrating the anniversary of 'Crazy in Love'! This song has a special place in my heart. Thank you for dancing and singing along with me. 💃🕺🎶 #CrazyInLove #Anniversary #DanceParty",
            createdAt: new Date(),
          },
          {
            musicalEntity: {
              type: "album",
              id: albumsIds["Lemonade"] // Assuming you have Beyoncé's album ID
            },
            userId: usersIds['Beyoncé'], // Assuming you have Beyoncé's user ID
            title: "Lemonade",
            content: "Lemonade forever! Can't believe it's been years since this album came out. What's your favorite track from 'Lemonade'? Share your thoughts! 🍋🎵 #Lemonade #FavoriteSong #Beyoncé",
            createdAt: new Date(),
          },
          // Add more posts for Beyoncé here
          {
            musicalEntity: {
              type: "artist",
              id: artistsIds['Beyoncé'] // Assuming you have Beyoncé's artist ID
            },
            userId: usersIds['Beyoncé'], // Assuming you have Beyoncé's user ID
            title: "Thank You, Fans!",
            content: "I just wanted to take a moment to express my gratitude to all of you. Your support and love for my music have been the greatest gift of my career. I promise there's more to come. Stay tuned! 🙏❤️🎤 #Beyoncé #Fans #Gratitude",
            createdAt: new Date(),
          },
          {
            musicalEntity: {
              type: "song",
              id: songsIds["Formation"] // Assuming you have Beyoncé's song ID
            },
            userId: usersIds['Beyoncé'], // Assuming you have Beyoncé's user ID
            title: "Formation",
            content: "Happy anniversary to 'Formation'! This song is a celebration of empowerment and identity. Thank you for embracing it and making it your anthem. 🙌👑🎶 #Formation #Anniversary #Empowerment",
            createdAt: new Date(),
          },
          {
            musicalEntity: {
              type: "album",
              id: albumsIds["B'Day"] // Assuming you have Beyoncé's album ID
            },
            userId: usersIds['Beyoncé'], // Assuming you have Beyoncé's user ID
            title: "B'Day",
            content: "It's 'B'Day'! Celebrating this album and the memories we've created together. What's your favorite track from 'B'Day'? Let me know! 🎂🎉🎵 #BDay #FavoriteSong #Beyoncé",
            createdAt: new Date(),
          },
          {
            musicalEntity: {
              type: "song",
              id: songsIds["Halo"] // Assuming you have Beyoncé's song ID
            },
            userId: usersIds['Beyoncé'], // Assuming you have Beyoncé's user ID
            title: "Halo",
            content: "To all the 'Halo' lovers out there, this one's for you! Thank you for letting this song into your hearts and sharing it with the world. 😇❤️🎶 #Halo #LoveSong #Beyoncé",
            createdAt: new Date(),
          },
          {
            musicalEntity: {
              type: "artist",
              id: artistsIds['Beyoncé'] // Assuming you have Beyoncé's artist ID
            },
            userId: usersIds['Beyoncé'], // Assuming you have Beyoncé's user ID
            title: "Beychella Memories",
            content: "Throwback to the incredible Beychella performance! That was a moment I'll cherish forever. What's your favorite Beychella memory? Share it with me! 🐝🎤🏟️ #Beychella #Memories #Beyoncé",
            createdAt: new Date()},
        {
            musicalEntity: {
              type: "artist",
              id: artistsIds['Ed Sheeran'] // Assuming you have Ed Sheeran's artist ID
            },
            userId: usersIds['Ed Sheeran'], // Assuming you have Ed Sheeran's user ID
            title: "Hello from Ed Sheeran!",
            content: "Thank you all for the incredible support on my latest album, '÷'. Your love and appreciation mean the world to me. Let's keep making beautiful music together! 💙🎶 #EdSheeran #÷ #MusicLove",
            createdAt: new Date(),
          },
          {
            musicalEntity: {
              type: "song",
              id: songsIds["Shape of You"] // Assuming you have Ed Sheeran's song ID
            },
            userId: usersIds['Ed Sheeran'], // Assuming you have Ed Sheeran's user ID
            title: "Shape of You",
            content: "Happy anniversary to 'Shape of You'! This song holds a special place in my heart, and I'm so grateful for the way it's connected with all of you. Thank you for listening and sharing your stories. ❤️🎶 #ShapeOfYou #Anniversary #Heartfelt",
            createdAt: new Date(),
          },
          {
            musicalEntity: {
              type: "album",
              id: albumsIds["÷"] // Assuming you have Ed Sheeran's album ID
            },
            userId: usersIds['Ed Sheeran'], // Assuming you have Ed Sheeran's user ID
            title: "÷",
            content: "Can't believe it's been years since '÷' came out! Time flies, but the memories and emotions attached to this album remain timeless. Which track from '÷' resonates with you the most? Share your favorites! 🌟🎵 #÷ #Throwback #Emotions",
            createdAt: new Date(),
          },
          {
            musicalEntity: {
              type: "artist",
              id: artistsIds['Ed Sheeran'] // Assuming you have Ed Sheeran's artist ID
            },
            userId: usersIds['Ed Sheeran'], // Assuming you have Ed Sheeran's user ID
            title: "Thank You, Fans!",
            content: "I just wanted to take a moment to express my gratitude to all of you. Your support and love for my music have been the greatest gift of my career. I promise there's more to come. Stay tuned! 🙏❤️🎤 #EdSheeran #Fans #Gratitude",
            createdAt: new Date(),
          },
        {
          musicalEntity: {
            type: "artist",
            id: artistsIds['Adele']
          },
          userId: usersIds['Adele'],
          title: "Hello from the Other Side!",
          content: "Thank you all for the incredible support on my latest album, '30'. Your love and appreciation mean the world to me. Let's keep making beautiful music together! 💙🎶 #Adele #30 #MusicLove",
          createdAt: new Date(),
        },
        {
          musicalEntity: {
            type: "song",
            id: songsIds["Rolling in the Deep"]
          },
          userId: usersIds['Adele'],
          title: "Rolling in the Deep",
          content: "Happy anniversary to 'Rolling in the Deep'! This song holds a special place in my heart, and I'm so grateful for the way it's connected with all of you. Thank you for listening and sharing your stories. 💔🎶 #Rolling in the Deep #Anniversary #Heartfelt",
          createdAt: new Date(),
        },
        {
          musicalEntity: {
            type: "album",
            id: albumsIds["25"]
          },
          userId: usersIds['Adele'],
          title: "25",
          content: "Can't believe it's been years since '25' came out! Time flies, but the memories and emotions attached to this album remain timeless. Which track from '25' resonates with you the most? Share your favorites! 🌟🎵 #25 #Throwback #Emotions",
          createdAt: new Date(),
        },
        {
          musicalEntity: {
            type: "artist",
            id: artistsIds['Adele']
          },
          userId: usersIds['Adele'],
          title: "Thank You, Fans!",
          content: "I just wanted to take a moment to express my gratitude to all of you. Your support and love for my music have been the greatest gift of my career. I promise there's more to come. Stay tuned! 🙏❤️🎤 #Adele #Fans #Gratitude",
          createdAt: new Date(),
        },
        {
            musicalEntity: {
              type: "artist",
              id: artistsIds['Taylor Swift'] // Assuming you have Taylor Swift's artist ID
            },
            userId: usersIds['Taylor Swift'], // Assuming you have Taylor Swift's user ID
            title: "Hello from Taylor Swift!",
            content: "Thank you all for the incredible support on my latest album, 'folklore'. Your love and appreciation mean the world to me. Let's keep making beautiful music together! 💙🎶 #TaylorSwift #folklore #MusicLove",
            createdAt: new Date(),
          },
          {
            musicalEntity: {
              type: "song",
              id: songsIds["Love Story"] // Assuming you have Taylor Swift's song ID
            },
            userId: usersIds['Taylor Swift'], // Assuming you have Taylor Swift's user ID
            title: "Love Story",
            content: "Celebrating the anniversary of 'Love Story'! This song has a special place in my heart, and I'm so grateful for the way it's connected with all of you. Thank you for listening and sharing your stories. ❤️🎶 #LoveStory #Anniversary #Heartfelt",
            createdAt: new Date(),
          },
          {
            musicalEntity: {
              type: "album",
              id: albumsIds["Red"] // Assuming you have Taylor Swift's album ID
            },
            userId: usersIds['Taylor Swift'], // Assuming you have Taylor Swift's user ID
            title: "Red",
            content: "Can't believe it's been years since 'Red' came out! Time flies, but the memories and emotions attached to this album remain timeless. Which track from 'Red' resonates with you the most? Share your favorites! 🌟🎵 #Red #Throwback #Emotions",
            createdAt: new Date(),
          },
          {
            musicalEntity: {
              type: "artist",
              id: artistsIds['Taylor Swift'] // Assuming you have Taylor Swift's artist ID
            },
            userId: usersIds['Taylor Swift'], // Assuming you have Taylor Swift's user ID
            title: "Thank You, Fans!",
            content: "I just wanted to take a moment to express my gratitude to all of you. Your support and love for my music have been the greatest gift of my career. I promise there's more to come. Stay tuned! 🙏❤️🎤 #TaylorSwift #Fans #Gratitude",
            createdAt: new Date(),
          },
          {
            musicalEntity: {
              type: "artist",
              id: artistsIds['Kendrick Lamar'] // Assuming you have Kendrick Lamar's artist ID
            },
            userId: usersIds['Kendrick Lamar'], // Assuming you have Kendrick Lamar's user ID
            title: "Hello from Kendrick Lamar!",
            content: "Thank you all for the incredible support on my latest album, 'DAMN.'. Your love and appreciation mean the world to me. Let's keep making thought-provoking music together! 🎤🔥 #KendrickLamar #DAMN #MusicLove",
            createdAt: new Date(),
          },
          {
            musicalEntity: {
              type: "song",
              id: songsIds["HUMBLE."] // Assuming you have Kendrick Lamar's song ID
            },
            userId: usersIds['Kendrick Lamar'], // Assuming you have Kendrick Lamar's user ID
            title: "HUMBLE.",
            content: "Celebrating the impact of 'HUMBLE.'! This song has sparked conversations and reflections. Thank you for your support and for staying true to yourselves. 💯🎶 #HUMBLE #Impact #Reflections",
            createdAt: new Date(),
          },
          {
            musicalEntity: {
              type: "album",
              id: albumsIds["To Pimp a Butterfly"] // Assuming you have Kendrick Lamar's album ID
            },
            userId: usersIds['Kendrick Lamar'], // Assuming you have Kendrick Lamar's user ID
            title: "To Pimp a Butterfly",
            content: "'To Pimp a Butterfly' remains a journey of self-discovery. What's your favorite track from this album? Share your insights! 🦋🎵 #ToPimpAButterfly #FavoriteSong #KendrickLamar",
            createdAt: new Date(),
          },
          {
            musicalEntity: {
              type: "artist",
              id: artistsIds['Kendrick Lamar'] // Assuming you have Kendrick Lamar's artist ID
            },
            userId: usersIds['Kendrick Lamar'], // Assuming you have Kendrick Lamar's user ID
            title: "Thank You, Fans!",
            content: "I want to extend my gratitude to all of you. Your unwavering support has allowed me to continue exploring my artistry. Stay tuned for what's next! 🙏🎶 #KendrickLamar #Fans #Gratitude",
            createdAt: new Date(),
        },
        {
            musicalEntity: {
              type: "artist",
              id: artistsIds['Rihanna'] // Assuming you have Rihanna's artist ID
            },
            userId: usersIds['Rihanna'], // Assuming you have Rihanna's user ID
            title: "Hello from Rihanna!",
            content: "Thank you all for the incredible support on my latest album, 'Anti'. Your love and appreciation mean the world to me. Let's keep making unforgettable music together! 💎🎶 #Rihanna #Anti #MusicLove",
            createdAt: new Date(),
          },
          {
            musicalEntity: {
              type: "song",
              id: songsIds["Umbrella"] // Assuming you have Rihanna's song ID
            },
            userId: usersIds['Rihanna'], // Assuming you have Rihanna's user ID
            title: "Umbrella",
            content: "Celebrating the timeless hit, 'Umbrella'! This song has been the soundtrack to many moments. Thank you for dancing in the rain with me. ☔🎶 #Umbrella #TimelessHit #Rihanna",
            createdAt: new Date(),
          },
          {
            musicalEntity: {
              type: "album",
              id: albumsIds["Good Girl Gone Bad"] // Assuming you have Rihanna's album ID
            },
            userId: usersIds['Rihanna'], // Assuming you have Rihanna's user ID
            title: "Good Girl Gone Bad",
            content: "Reflecting on 'Good Girl Gone Bad' and the journey it represents. Which track from this album resonates with you the most? Share your favorites! 🌟🎵 #GoodGirlGoneBad #FavoriteSong #Rihanna",
            createdAt: new Date(),
          },
          {
            musicalEntity: {
              type: "artist",
              id: artistsIds['Rihanna'] // Assuming you have Rihanna's artist ID
            },
            userId: usersIds['Rihanna'], // Assuming you have Rihanna's user ID
            title: "Thank You, Navy!",
            content: "I want to express my gratitude to all my fans, the Navy. Your unwavering support has been my driving force. More music and adventures ahead! 🙏⚓❤️ #Rihanna #Navy #Gratitude",
            createdAt: new Date(),
          },
          {
            musicalEntity: {
                type: "artist",
                id: artistsIds['Billie Eilish'] // Assuming you have Billie Eilish's artist ID
            },
            userId: usersIds['Billie Eilish'], // Assuming you have Billie Eilish's user ID
            title: "Hello from Billie Eilish!",
            content: "Thank you all for the incredible support on my latest album, 'When We All Fall Asleep, Where Do We Go?'. Your love and appreciation mean the world to me. Let's keep making unique and creative music together! 🎶🖤 #BillieEilish #WhenWeAllFallAsleep #MusicLove",
            createdAt: new Date(),
        },
        {
            musicalEntity: {
                type: "song",
                id: songsIds["Bad Guy"] // Assuming you have Billie Eilish's song ID
            },
            userId: usersIds['Billie Eilish'], // Assuming you have Billie Eilish's user ID
            title: "Bad Guy",
            content: "Celebrating the success of 'Bad Guy'! This song has been a wild ride, and I'm grateful for all the bad guys and girls out there who made it possible. 🎶🕺💃 #BadGuy #Success #BillieEilish",
            createdAt: new Date(),
        },
        {
            musicalEntity: {
                type: "album",
                id: albumsIds["When We All Fall Asleep, Where Do We Go?"] // Assuming you have Billie Eilish's album ID
            },
            userId: usersIds['Billie Eilish'], // Assuming you have Billie Eilish's user ID
            title: "When We All Fall Asleep, Where Do We Go?",
            content: "Can't believe it's been years since 'When We All Fall Asleep, Where Do We Go?' was released. What's your favorite track from the album? Share your thoughts! 🌙🎵 #WhenWeAllFallAsleep #FavoriteSong #BillieEilish",
            createdAt: new Date(),
        },
        {
            musicalEntity: {
                type: "artist",
                id: artistsIds['Billie Eilish'] // Assuming you have Billie Eilish's artist ID
            },
            userId: usersIds['Billie Eilish'], // Assuming you have Billie Eilish's user ID
            title: "Thank You, Fans!",
            content: "I want to express my gratitude to all of you. Your support and love for my music have been a source of inspiration and creativity. Stay tuned for more unique sounds! 🙏💚🎤 #BillieEilish #Fans #Gratitude",
            createdAt: new Date(),
        },
        {
            musicalEntity: {
                type: "song",
                id: songsIds["Ocean Eyes"] // Assuming you have Billie Eilish's song ID
            },
            userId: usersIds['Billie Eilish'], // Assuming you have Billie Eilish's user ID
            title: "Ocean Eyes",
            content: "To all the 'Ocean Eyes' enthusiasts, this one's for you! Thank you for embracing this song and making it a part of your life. 🌊👀🎶 #OceanEyes #Embrace #BillieEilish",
            createdAt: new Date(),
        },
            {
                musicalEntity: {
                    type: "artist",
                    id: artistsIds['Drake'] // Assuming you have Drake's artist ID
                },
                userId: usersIds['Drake'], // Assuming you have Drake's user ID
                title: "Hello from Drake!",
                content: "Thank you for the love and support over the years. I'm grateful for the journey and excited about what's coming next. Let's keep making history together. 🎶🦉 #Drake #MusicJourney",
                createdAt: new Date(),
            },
            {
                musicalEntity: {
                    type: "song",
                    id: songsIds["God's Plan"] // Assuming you have Drake's song ID
                },
                userId: usersIds['Drake'], // Assuming you have Drake's user ID
                title: "God's Plan",
                content: "Celebrating the impact of 'God's Plan.' This song means a lot to me, and I'm glad it resonated with so many of you. 🙏🌟 #GodsPlan #Impact #Drake",
                createdAt: new Date(),
            },
            {
                musicalEntity: {
                    type: "album",
                    id: albumsIds["Scorpion"] // Assuming you have Drake's album ID
                },
                userId: usersIds['Drake'], // Assuming you have Drake's user ID
                title: "Scorpion",
                content: "It's been a while since 'Scorpion' dropped. What's your favorite track from the album? Share your thoughts and memories! 🦂🎵 #Scorpion #FavoriteTrack #Drake",
                createdAt: new Date(),
            },
            {
                musicalEntity: {
                    type: "artist",
                    id: artistsIds['Drake'] // Assuming you have Drake's artist ID
                },
                userId: usersIds['Drake'], // Assuming you have Drake's user ID
                title: "Thank You, Fans!",
                content: "My fans have been incredible throughout this journey. Your support has been the driving force behind my music. Stay tuned for more vibes! 🙌🔥🎤 #Drake #Fans #Gratitude",
                createdAt: new Date(),
            },
            {
                musicalEntity: {
                    type: "song",
                    id: songsIds["In My Feelings"] // Assuming you have Drake's song ID
                },
                userId: usersIds['Drake'], // Assuming you have Drake's user ID
                title: "In My Feelings",
                content: "'In My Feelings' was a vibe! Shoutout to everyone who danced to this track. Share your dance videos with me! 💃🕺🎶 #InMyFeelings #DanceChallenge #Drake",
                createdAt: new Date(),
            },
            {
                musicalEntity: {
                    type: "album",
                    id: albumsIds['Certified Lover Boy'] // Assuming you have Drake's "Certified Lover Boy" album ID
                },
                userId: usersIds['Adele'],
                title: "Discovering New Music",
                content: "Just stumbled upon @Drake's latest album 'Certified Lover Boy.' 🎧 What's your favorite track from it? #NewMusic #Drake #CertifiedLoverBoy",
                createdAt: new Date(),
            },
            {
                musicalEntity: {
                    type: "album",
                    id: albumsIds['Certified Lover Boy'] // Assuming you have Drake's "Certified Lover Boy" album ID
                },
                userId: usersIds['Ed Sheeran'],
                title: "Discovering New Music",
                content: "Just stumbled upon @Drake's latest album 'Certified Lover Boy.' 🎧 What's your favorite track from it? #NewMusic #Drake #CertifiedLoverBoy",
                createdAt: new Date(),
            },
            {
                musicalEntity: {
                    type: "album",
                    id: albumsIds['Certified Lover Boy'] // Assuming you have Drake's "Certified Lover Boy" album ID
                },
                userId: usersIds['Beyoncé'],
                title: "Discovering New Music",
                content: "Just stumbled upon @Drake's latest album 'Certified Lover Boy.' 🎧 What's your favorite track from it? #NewMusic #Drake #CertifiedLoverBoy",
                createdAt: new Date(),
            },
            // ... Continue with other artists and albums
            {
                musicalEntity: {
                    type: "album",
                    id: albumsIds['Fearless'] // Assuming you have Taylor Swift's "Fearless" album ID
                },
                userId: usersIds['Rihanna'],
                title: "Rediscovering Classics",
                content: "Listening to @Taylor Swift's album 'Fearless' today. It's a timeless classic. What's your favorite track from this album? #TaylorSwift #Fearless",
                createdAt: new Date(),
            },
            {
                musicalEntity: {
                    type: "album",
                    id: albumsIds['Anti'] // Assuming you have Rihanna's "Anti" album ID
                },
                userId: usersIds['Kendrick Lamar'],
                title: "Exploring New Sounds",
                content: "Currently vibing to @Rihanna's 'Anti' album. It's got some unique tracks. What's your favorite song from this album? #Rihanna #Anti",
                createdAt: new Date(),
            },
            {
                musicalEntity: {
                    type: "album",
                    id: albumsIds['Certified Lover Boy'] // Assuming you have Drake's "Certified Lover Boy" album ID
                },
                userId: usersIds['Beyoncé'],
                title: "Discovering New Music",
                content: "Just stumbled upon @Drake's latest album 'Certified Lover Boy.' 🎧 What's your favorite track from it? #NewMusic #Drake #CertifiedLoverBoy",
                createdAt: new Date(),
            },
            // ... Continue with other artists and albums
            {
                musicalEntity: {
                    type: "album",
                    id: albumsIds['Fearless'] // Assuming you have Taylor Swift's "Fearless" album ID
                },
                userId: usersIds['Rihanna'],
                title: "Rediscovering Classics",
                content: "Listening to @Taylor Swift's album 'Fearless' today. It's a timeless classic. What's your favorite track from this album? #TaylorSwift #Fearless",
                createdAt: new Date(),
            },
            {
                musicalEntity: {
                    type: "album",
                    id: albumsIds['Anti'] // Assuming you have Rihanna's "Anti" album ID
                },
                userId: usersIds['Kendrick Lamar'],
                title: "Exploring New Sounds",
                content: "Currently vibing to @Rihanna's 'Anti' album. It's got some unique tracks. What's your favorite song from this album? #Rihanna #Anti",
                createdAt: new Date(),
            },
            // ... Add more mixed posts between artists and albums
        
            {
                musicalEntity: {
                    type: "album",
                    id: albumsIds['Happier Than Ever'] // Assuming you have Billie Eilish's "Happier Than Ever" album ID
                },
                userId: usersIds['Taylor Swift'],
                title: "Diverse Music Tastes",
                content: "Switching things up today by listening to @Billie Eilish's 'Happier Than Ever.' Billie's music always brings a unique vibe. What's your favorite track from this album? #BillieEilish #HappierThanEver",
                createdAt: new Date(),
            },
            {
                musicalEntity: {
                    type: "album",
                    id: albumsIds['Scorpion'] // Assuming you have Drake's "Scorpion" album ID
                },
                userId: usersIds['Billie Eilish'],
                title: "Late Night Vibes",
                content: "Late-night mood with @Drake's 'Scorpion' album. It's the perfect soundtrack for winding down. Which track do you enjoy the most from this album? #Drake #Scorpion",
                createdAt: new Date(),
            },
      ];

    await (posts.map(async post => {
        try {
            const createdPost = new Post(post);
            await createdPost.save();
        } catch {}

    }))


    }  catch (error) {
        console.log(erro)
   }

}