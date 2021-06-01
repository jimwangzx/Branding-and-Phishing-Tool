from concurrent.futures import ThreadPoolExecutor
from generator import Domain_generator
import requests
import threading
import tldextract

url='https://www.google.com/'
url='https://www.youtube.com/'
url='https://accounts.google.com'

g=Domain_generator(url)
possible_urls=sorted(g.generate_urls())

print("Search space",len(possible_urls))

d1={}
d2={}
for i in possible_urls:
    d1[i]=0
    d2[i]=0


def fetch(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
    }
    d1[url]=1
    try:
        res=requests.get(url,headers=headers,timeout=3)
        if(res):
            print(url)
    except Exception:
        pass
    

def thread_function(index,possible_urls,workers):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
    }
    work_load=int(len(possible_urls)/workers)
    end=(index+1)*work_load
    if(index==workers-1):
        end=len(possible_urls)

    
    for i in range(index*work_load,end):
        d2[possible_urls[i]]=1
        try:
            res=requests.get(possible_urls[i],headers=headers,timeout=3)
            #print(f'{res.status} - {possible_urls[i]}')
            if(res):
                print(possible_urls[i])
        except Exception:
            pass


def main():
    
    with ThreadPoolExecutor(max_workers=100) as executor:
        executor.map(fetch, possible_urls)
        executor.shutdown(wait=True)
    
    cnt=0
    for i in d1:
        if(d1[i]==1):
            cnt=cnt+1
    
    print("Final count",cnt)


def useThread():
    workers=100
    threads = list()
    
    for index in range(workers):
        x = threading.Thread(target=thread_function, args=(index,possible_urls,workers,))
        threads.append(x)
        x.start()

    for thread in threads:
        thread.join()

    
    cnt=0
    for i in d2:
        if(d2[i]==1):
            cnt=cnt+1
    
    print("Final count",cnt)


def test(arr):
    arr[0][0]=1

d={0:'char0'}

arr=[d]*100

test(arr)
print(arr[0][0])
print(arr[1][0])

#main()
#useThread()

url='www.google.com/index.html'
url='https://mail.google.com/random/index.html/'
r=tldextract.extract(url)


if(url[:4]!='http'):
        url='https://'+url

m=url.split('/')
print(m)
print(r)
print(url)
