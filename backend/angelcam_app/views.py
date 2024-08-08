import requests
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods

@require_http_methods(['POST'])
def login_view(request):
    token = request.POST.get('token')
    if not token:
        return HttpResponse('Token is required', status=400)

    # Make a request to the Angelcam API to validate the token
    angelcam_url = 'https://api.angelcam.com/v1/auth/token'
    headers = {'Authorization': f'Bearer {token}'}
    response = requests.get(angelcam_url, headers=headers)

    if response.status_code == 200:
        request.session['angelcam_token'] = token
        return JsonResponse({'message': 'Token is valid'})
    elif response.status_code == 401:
        return HttpResponse('Invalid token', status=401)
    else:
        return HttpResponse('Error occurred', status=500)
    
@require_http_methods(['GET'])
def camera_list_view(request):

    token = request.session.get('angelcam_token')

    if not token:

        return JsonResponse({'error': 'Token is required'}, status=401)


    angelcam_url = 'https://api.angelcam.com/v1/cameras'

    headers = {'Authorization': f'Bearer {token}'}

    response = requests.get(angelcam_url, headers=headers)


    if response.status_code == 200:

        cameras = response.json()

        return JsonResponse({'cameras': cameras})

    else:

        return JsonResponse({'error': 'Error occurred'}, status=500)
    


@require_http_methods(['GET'])

def live_video_view(request, camera_id):

    token = request.session.get('token')

    if not token:

        return HttpResponse('Unauthorized', status=401)


    # Make a request to the Angelcam API to get the live video stream URL

    angelcam_url = f'https://api.angelcam.com/v1/cameras/{camera_id}/stream'

    headers = {'Authorization': f'Bearer {token}'}

    response = requests.get(angelcam_url, headers=headers)


    if response.status_code == 200:

        stream_url = response.json()['stream_url']

        return JsonResponse({'stream_url': stream_url})

    elif response.status_code == 401:

        return HttpResponse('Invalid token', status=401)

    else:

        return HttpResponse('Error occurred', status=500)